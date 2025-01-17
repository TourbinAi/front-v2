"use client"

import path from "path"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { env } from "@/env.mjs"
import polyline from "@mapbox/polyline"
import * as Sentry from "@sentry/nextjs"
import axios from "axios"
import PlaceHolderImage from "public/assets/images/placeholderImages.png"

import { PackagesPlaceRes } from "@/types/api"

import { postData } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import StarRating from "@/components/ui/starRating"

import markerIcon from "./marker.svg"

const MapWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
)

const TileLayerWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)

const MarkerWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
)

const PolylineWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
)

const PopupWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
)

let L: any = null
if (typeof window !== "undefined") {
  L = require("leaflet")
  require("leaflet/dist/leaflet.css")
}

interface MapProps {
  packageId: number
  setPlan: Dispatch<SetStateAction<PackagesPlaceRes | undefined>>
  dirction_url: string
}

function Map({ packageId, setPlan, dirction_url }: MapProps) {
  const [route, setRoute] = useState<any[]>([])
  const [waypoint, setWaypoint] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await postData(packageId)
        setPlan(responseData.data)
        const waypointInfo = responseData.data.places.map((place) => ({
          latitude: Number(place.latitude),
          longitude: Number(place.longitude),
          namePlace: place.name,
          imagePlace: place.first_image,
          rateStar: place.rating,
        }))
        setWaypoint(waypointInfo)
      } catch (error) {
        Sentry.captureException(error)
        console.error(error)
      }
    }
    fetchData()
  }, [packageId, setPlan])

  useEffect(() => {
    if (!waypoint.length) return
    const fetchRoute = async () => {
      try {
        const response = await axios.get(`${dirction_url}`, {
          headers: { "api-key": env.NEXT_PUBLIC_NESHAN_KEY },
        })
        if (response.data?.routes?.[0]) {
          const decodedPolyline = response.data.routes[0].legs.flatMap(
            (leg: any) =>
              leg.steps.flatMap((step: any) => polyline.decode(step.polyline))
          )
          setRoute(decodedPolyline)
        }
      } catch (error) {
        console.error("Error fetching directions:", error)
      }
    }
    fetchRoute()
  }, [waypoint, dirction_url])

  const startIndex = dirction_url.indexOf("origin=") + "origin=".length
  const endIndex = dirction_url.indexOf("&", startIndex)
  const origin = dirction_url.substring(startIndex, endIndex)
  const [latitude, longitude] = origin.split(",").map(Number)

  let customIcon = null
  if (L) {
    customIcon = new L.Icon({
      iconUrl: markerIcon.src,
      iconSize: [24, 36],
      iconAnchor: [12, 36],
      popupAnchor: [0, -36],
    })
    L.Marker.prototype.options.icon = customIcon
  }

  // Calculate map bounds
  const bounds = (() => {
    if (!waypoint.length) return undefined

    const points = []
    // Add waypoints
    for (const point of waypoint) {
      if (point.latitude && point.longitude) {
        points.push([point.latitude, point.longitude])
      }
    }
    // Add origin point
    if (latitude && longitude) {
      points.push([latitude, longitude])
    }

    if (points.length < 2) return undefined

    // Find min/max coordinates
    const lats = points.map((p) => p[0])
    const lngs = points.map((p) => p[1])

    // Calculate the range of coordinates
    const latRange = Math.max(...lats) - Math.min(...lats)
    const lngRange = Math.max(...lngs) - Math.min(...lngs)

    // Add 20% padding
    const padding = 0.2
    const latPadding = latRange * padding
    const lngPadding = lngRange * padding

    return [
      [Math.min(...lats) - latPadding, Math.min(...lngs) - lngPadding],
      [Math.max(...lats) + latPadding, Math.max(...lngs) + lngPadding],
    ] as [[number, number], [number, number]]
  })()

  return (
    <MapWithNoSSR
      key={JSON.stringify(bounds)}
      bounds={bounds}
      center={bounds ? undefined : [35.6892, 51.389]}
      zoom={bounds ? undefined : 6}
      scrollWheelZoom={true}
      className="size-full"
    >
      <TileLayerWithNoSSR
        attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={18}
      />
      {waypoint && waypoint.length > 0 && (
        <>
          {waypoint.map((position, idx) => (
            <MarkerWithNoSSR
              key={idx}
              position={
                [position.latitude, position.longitude] as [number, number]
              }
            >
              <PopupWithNoSSR>
                <Card className="relative size-40 cursor-pointer overflow-hidden">
                  <CardContent className="relative size-full">
                    <Image
                      fill
                      src={path.join(
                        env.NEXT_PUBLIC_BACKEND_URL,
                        position.imagePlace || PlaceHolderImage.src
                      )}
                      alt="image"
                      className="absolute inset-0 size-full object-cover"
                    />
                    <span className="absolute bottom-0 left-0 w-full rounded-b-2xl bg-black/50 py-2 text-center text-white">
                      {position.namePlace}
                    </span>
                    <StarRating rating={position.rateStar} />
                  </CardContent>
                </Card>
              </PopupWithNoSSR>
            </MarkerWithNoSSR>
          ))}

          <MarkerWithNoSSR position={[latitude, longitude] as [number, number]}>
            <PopupWithNoSSR>Your starting point</PopupWithNoSSR>
          </MarkerWithNoSSR>

          {route.length > 0 && (
            <PolylineWithNoSSR positions={route} color="red" />
          )}
        </>
      )}
    </MapWithNoSSR>
  )
}

export default Map
