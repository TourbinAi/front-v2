import React from "react"

import { Header } from "@/components/elementary/Header"

interface BlogLayoutProps {
  children: React.ReactNode
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default BlogLayout
