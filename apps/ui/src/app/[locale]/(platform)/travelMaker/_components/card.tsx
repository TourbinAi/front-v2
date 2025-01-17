"use client"

import path from "path"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { env } from "@/env.mjs"
import { ChevronLeft } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { useRouter } from "@/lib/navigation"
import { cn } from "@/lib/styles"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import CityGraph from "./cityGraph"

type City = {
  id: number
  name: string
  image_url: string | null
}

type RouteCardProps = {
  latitude: string
  longitude: string
  id: number
  name: string
  description: string
  cities: City[]
  index: number
}

type ImageLoadingState = {
  [key: string]: {
    loaded: boolean
    url: string
  }
}

export default function RouteCard({ id, name, cities, index }: RouteCardProps) {
  const router = useRouter()
  const [selectedCity, setSelectedCity] = useState<City>(cities[0] as City)
  const [isVisible, setIsVisible] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [isCurrentImageLoading, setIsCurrentImageLoading] = useState(true)
  const cardRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("travelMaker.card")
  const locale = useLocale()

  useEffect(() => {
    setIsCurrentImageLoading(!loadedImages.has(selectedCity.name))
  }, [selectedCity.name, loadedImages])

  useEffect(() => {
    if (!isVisible) return

    const preloadImage = (city: City) => {
      if (!city.image_url || loadedImages.has(city.name)) return

      const img = new window.Image()
      img.onload = () => {
        setLoadedImages((prev) => {
          const newSet = new Set(prev)
          newSet.add(city.name)
          return newSet
        })
      }
      img.src = `${env.NEXT_PUBLIC_BACKEND_URL}/${city.image_url.replace(/^\/+/, "")}`
    }

    // Preload all images immediately
    cities.forEach(preloadImage)
  }, [isVisible, cities, loadedImages])

  useEffect(() => {
    const card = cardRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsVisible(entries[0].isIntersecting)
        }
      },
      {
        root: null,
        rootMargin: "50px",
        threshold: 0.1,
      }
    )

    if (card) {
      observer.observe(card)
    }

    return () => {
      if (card) {
        observer.unobserve(card)
      }
    }
  }, [])

  const handleViewDetails = () => {
    router.push(`/travelMaker/${id}/map`)
  }

  const handleCityClick = (cityName: string) => {
    setSelectedCity(
      cities.find((c) => c.name === cityName) || (cities[0] as City)
    )
  }

  const getImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return ""
    const cleanPath = imageUrl.replace(/^\/+/, "")
    return `${env.NEXT_PUBLIC_BACKEND_URL}/${cleanPath}`
  }

  return (
    <Card
      ref={cardRef}
      className="relative h-[250px] w-full max-w-7xl overflow-hidden"
    >
      {selectedCity.image_url && isVisible && (
        <>
          {isCurrentImageLoading && (
            <div className="absolute inset-0 bg-gray-800">
              <Skeleton className="h-full w-full" />
            </div>
          )}
          <Image
            fill
            src={`${env.NEXT_PUBLIC_BACKEND_URL}/${selectedCity.image_url.replace(/^\/+/, "")}`}
            alt={selectedCity.name}
            className={cn(
              "absolute inset-0 w-full object-cover lg:h-auto lg:max-h-none lg:w-full",
              isCurrentImageLoading
                ? "opacity-0"
                : "opacity-100 transition-opacity duration-200"
            )}
            priority={index < 2 && selectedCity === cities[0]}
            onLoadingComplete={() => {
              setLoadedImages((prev) => {
                const newSet = new Set(prev)
                newSet.add(selectedCity.name)
                return newSet
              })
              setIsCurrentImageLoading(false)
            }}
            onError={() => setIsCurrentImageLoading(false)}
          />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent" />
      <CardContent className="relative flex h-full flex-col justify-between p-8 text-white">
        <span
          className={cn(
            "text-md absolute top-2 cursor-default rounded-full bg-black bg-opacity-60 px-4 py-2 backdrop-blur-sm",
            locale === "fa" ? "right-0" : "left-0"
          )}
        >
          {selectedCity.name}
        </span>
        <div className="flex size-full items-center justify-between">
          {cities.length > 1 ? (
            <CityGraph
              cities={cities}
              selectedCity={selectedCity}
              onCityClick={handleCityClick}
            />
          ) : (
            <div className="h-[104px] w-[100px]" />
          )}
          <div className="flex w-full items-center justify-between lg:w-1/2">
            <div className="relative flex size-full flex-col items-center justify-center gap-4">
              <h2 className="text-gl text-wrap text-center align-middle font-bold lg:text-xl">
                {name}
              </h2>
              <Button
                onClick={handleViewDetails}
                className="bg-white px-2 py-3 text-sm text-black hover:bg-gray-200 lg:text-xl"
              >
                <ChevronLeft className="h-6 w-6" /> {t("seeMore")}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
