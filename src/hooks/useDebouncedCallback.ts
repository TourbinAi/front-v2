/**
 * @see https://github.com/mantinedev/mantine/blob/master/packages/@mantine/hooks/src/use-debounced-callback/use-debounced-callback.ts
 */

import * as React from "react"

import { useCallbackRef } from "@/hooks/useCallbackRef"

export function useDebouncedCallback<T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number
) {
  const handleCallback = useCallbackRef(callback)
  const debounceTimerRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current && typeof window !== "undefined") {
        window.clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  const setValue = React.useCallback(
    (...args: Parameters<T>) => {
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current)
      }
      debounceTimerRef.current = window.setTimeout(
        () => handleCallback(...args),
        delay
      )
    },
    [handleCallback, delay]
  )

  return setValue
}
