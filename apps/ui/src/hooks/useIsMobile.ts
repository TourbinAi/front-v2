"use client"

import { useEffect, useState } from "react"

export function useIsMobile(breakpoint: number = 1024) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === "undefined") return

    // Create media query
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)

    // Initial check
    setIsMobile(mediaQuery.matches)

    // Add listener for changes
    const handleResize = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    // Add the listener
    mediaQuery.addEventListener("change", handleResize)

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleResize)
  }, [breakpoint])

  return isMobile
}
