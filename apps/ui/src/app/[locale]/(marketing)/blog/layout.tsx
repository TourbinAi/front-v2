import { Suspense } from "react"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container relative">
      <Suspense fallback={<div className="py-10">Loading...</div>}>
        <section>{children}</section>
      </Suspense>
    </div>
  )
}
