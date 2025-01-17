import { ReactNode } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Toorbeen",
  description: "Toorbeen - Your Travel Companion",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>{children}</body>
    </html>
  )
}
