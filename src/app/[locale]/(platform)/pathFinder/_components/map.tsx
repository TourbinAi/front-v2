"use client";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import polyline from "@mapbox/polyline";
import dynamic from "next/dynamic";
const MapWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);

const TileLayerWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false,
  }
);

const MarkerWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false,
  }
);

const PolylineWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  {
    ssr: false,
  }
);

const PopupWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  {
    ssr: false,
  }
);

let L: any = null;
if (typeof window !== "undefined") {
  L = require("leaflet");
  require("leaflet/dist/leaflet.css");
}
interface Info {
  type: string;
  originLat: number;
  originLong: number;
  destinationLat: number;
  destinationLong: number;
  traffic: boolean;
  odEven: boolean;
  alternative: boolean;
  bearing: number;
}
interface Leg {
  steps: Array<{ polyline: string }>;
}

interface fullData {
  legs: Leg[];
}

function MapPathFinder({
  origin,
  destination,
}: {
  origin: any;
  destination: any[];
}) {
  const [info, setInfo] = useState<Info>({
    type: "car",
    originLat: 35.69524140795555,
    originLong: 51.40891271972657,
    destinationLat: 35.534802198378785,
    destinationLong: 57.126487269498455,
    traffic: false,
    odEven: false,
    alternative: false,
    bearing: 170,
  });

  const [originLoc, setLocOrigin] = useState<{ x: number; y: number }>();
  const [destinationLoc, setLocDestination] = useState<any[]>([]);
  const [route, setRoute] = useState<LatLngExpression[]>([]);
  const [centerX, setX] = useState(52.956453660199);
  const [centerY, setY] = useState(32.68558325422626);
  const [center, setCenter] = useState<LatLngExpression>([centerY, centerX]); //open map
  useEffect(() => {
    if (origin && destination.length > 0) {
      setLocOrigin(origin.location);
      setLocDestination(destination);
      let y = (origin.location.y + destination[0].location.y) / 2;
      let x = (origin.location.x + destination[0].location.x) / 2;
      setX(x);
      setY(y);
    }
  }, [origin, destination]);

  useEffect(() => {
    const apiReq = async () => {
      // console.log("api req");
      // console.log(originLoc);
      // console.log(destinationLoc.at(-1));

      if (originLoc && destinationLoc.length === 1) {
        // console.log("update req");
        try {
          const response = await axios.get(
            `https://api.neshan.org/v4/direction?type=${info.type}&origin=${originLoc.y},${originLoc.x}&destination=${destinationLoc[0].location.y},${destinationLoc[0].location.x}&avoidTrafficZone=${info.traffic}&avoidodEvenZone=${info.odEven}&alternative=${info.alternative}&bearing=`,
            {
              headers: { "api-key": process.env.NEXT_PUBLIC_NESHAN_KEY },
            }
          );
          const data = response.data.routes[0];
          const decodedPolyline = decodeLegsPolyLines(data.legs);
          setRoute(decodedPolyline);
          //console.log(decodedPolyline);
        } catch (err) {
          console.log("Error fetching route:", err);
        }
      } else {
        // console.log(destinationLoc.at(-1));
        const desDynamic = destination.at(-1);
        let waypointParams = destinationLoc
          .map((data) => {
            return `${data.location.y},${data.location.x}%7C`;
          })
          .join("");

        let waypointReq = waypointParams.slice(0, -3);

        try {
          const response = await axios.get(
            `https://api.neshan.org/v4/direction?type=${info.type}&origin=${originLoc?.y},${originLoc?.x}&destination=${desDynamic.location.y},${desDynamic.location.x}&waypoints=${waypointReq}&avoidTrafficZone=${info.traffic}&avoidodEvenZone=${info.odEven}&alternative=${info.alternative}&bearing=`,
            {
              headers: { "api-key": process.env.NEXT_PUBLIC_NESHAN_KEY },
            }
          );
          // console.log(response);
          const data = response.data.routes[0];
          const decodedPolyline = decodeLegsPolyLines(data.legs);
          setRoute(decodedPolyline);
        } catch (error) {
          // console.error("Error fetching directions:", error);
        }
      }
    };

    if (originLoc && destinationLoc.length > 0) {
      apiReq();
    }
  }, [originLoc, destinationLoc]);

  useEffect(() => {
    if (route.length > 0) {
      // console.log("Route updated:", route);
    }
  }, [route]);

  const decodeLegsPolyLines = (legs: Leg[]): LatLngExpression[] => {
    return legs.flatMap((leg) =>
      leg.steps.flatMap(
        (step) => polyline.decode(step.polyline) as LatLngExpression[]
      )
    );
  };

  let customIcon = null;
  if (L) {
    customIcon = new L.Icon({
      iconUrl: "/assets/icons/markerMap.png",
      iconSize: [15, 30],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = customIcon;
  }
  // console.log(destinationLoc);
  // console.log("ENNNNVVVV: ", process.env.NEXT_PUBLIC_NESHAN_KEY);
  return (
    <>
      <div>
        <MapWithNoSSR
          center={center}
          zoom={5}
          scrollWheelZoom={false}
          className="h-96 w-full border-4 border-white"
        >
          <TileLayerWithNoSSR
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={18}
          />

          {route.length > 0 && (
            <PolylineWithNoSSR positions={route} color="red" />
          )}
          {originLoc && (
            <MarkerWithNoSSR
              position={[originLoc.y, originLoc.x] as LatLngExpression}
            >
              <PopupWithNoSSR>start</PopupWithNoSSR>
            </MarkerWithNoSSR>
          )}
          {destinationLoc &&
            destinationLoc.map((position, idx) => (
              <MarkerWithNoSSR
                key={idx}
                position={
                  [position.location.y, position.location.x] as LatLngExpression
                }
              >
                <PopupWithNoSSR>{position.address}</PopupWithNoSSR>
              </MarkerWithNoSSR>
            ))}
        </MapWithNoSSR>
      </div>
    </>
  );
}

export default MapPathFinder;
