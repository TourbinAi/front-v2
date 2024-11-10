"use client"

import { LatLngExpression } from "leaflet"

import "leaflet/dist/leaflet.css"

import React, { useCallback, useEffect, useState } from "react"
import polyline from "@mapbox/polyline"
import * as Sentry from "@sentry/nextjs"
import { Clock, MapPin } from "lucide-react"

import { NeshanDataItemType } from "@/types/api"

import { neshanDirectionAPI } from "@/lib/neshan"

import {
  L,
  MapWithNoSSR,
  MarkerWithNoSSR,
  PolylineWithNoSSR,
  PopupWithNoSSR,
  TileLayerWithNoSSR,
} from "../../_components/leafletNOSSR"

// Interfaces and Types
interface Leg {
  steps: Array<{ polyline: string }>
}

// MapPathFinder Component
// This component renders a map with Leaflet, displaying a route between an origin and one or more destination points.
function MapPathFinder({
  origin,
  destination,
}: {
  origin: NeshanDataItemType
  destination: NeshanDataItemType[]
}) {
  const [originLoc, setLocOrigin] = useState<{ x: number; y: number }>()
  const [destinationLoc, setLocDestination] = useState<NeshanDataItemType[]>([])
  const [route, setRoute] = useState<LatLngExpression[]>([])
  const [center, setCenter] = useState<LatLngExpression>([
    32.68558325422626, 52.956453660199,
  ])
  const [textRoute, setText] = useState<any[]>([])

  // useEffect - Update origin and destination states on prop change
  useEffect(() => {
    if (origin && destination[0]) {
      setLocOrigin(origin.location)
      setLocDestination(destination)
      const y = (origin.location.y + destination[0].location.y) / 2
      const x = (origin.location.x + destination[0].location.x) / 2
      setCenter([y, x])
    }
  }, [origin, destination])

  // apiReq - Fetches the route data from the Neshan API using origin and destination coordinates
  const apiReq = useCallback(async () => {
    if (!originLoc || destinationLoc.length === 0) return
    const lastDestination = destinationLoc[destinationLoc.length - 1]
    const waypointParams = destinationLoc
      .map((data) => `${data.location.y},${data.location.x}`)
      .join("%7C")

    try {
      const response = await neshanDirectionAPI(
        "car",
        { lat: originLoc.y, lng: originLoc.x },
        {
          lat: lastDestination?.location?.y || 0,
          lng: lastDestination?.location.x || 0,
        },
        waypointParams,
        false,
        false,
        false
      )

      const data = response.data.routes[0]
      if (data) {
        setText(data.legs)
        setRoute(decodeLegsPolyLines(data.legs))
      }
    } catch (error) {
      Sentry.captureException(error) // Capture errors with Sentry
    }
  }, [originLoc, destinationLoc])

  useEffect(() => {
    apiReq() // Call API when the origin or destination changes
  }, [apiReq])

  // decodeLegsPolyLines - Decodes polyline data from route legs for rendering
  const decodeLegsPolyLines = (legs: Leg[]): LatLngExpression[] => {
    return legs.flatMap((leg) =>
      leg.steps.flatMap(
        (step) => polyline.decode(step.polyline) as LatLngExpression[]
      )
    )
  }

  // Custom Leaflet Marker Icon
  const customIcon = L
    ? new L.Icon({
        iconUrl: "/assets/icons/markerMap.png",
        iconSize: [15, 30],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
      })
    : null
  L.Marker.prototype.options.icon = customIcon // Set custom marker icon globally

  return (
    <>
      {/* Map Rendering */}
      <div>
        <MapWithNoSSR
          center={center}
          zoom={5}
          scrollWheelZoom
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
          {destinationLoc.map((position, idx) => (
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
      {/* Route Details Display */}
      <div className="flex flex-wrap items-center justify-center gap-1">
        {textRoute.map(
          (text, idx) =>
            text.distance.text && (
              <div key={idx} className="rounded bg-white p-2 shadow-md">
                <p className="flex items-center text-lg font-semibold text-gray-800">
                  مقصد {idx + 1}:
                  <span className="inline-flex items-center">
                    <Clock className="mr-2 size-5 text-blue-500" />{" "}
                    {text.duration.text}
                  </span>
                  <span className="inline-flex items-center">
                    <MapPin className="mr-2 size-5 text-green-500" />{" "}
                    {text.distance.text}
                  </span>
                </p>
              </div>
            )
        )}
      </div>
    </>
  )
}

export default MapPathFinder
