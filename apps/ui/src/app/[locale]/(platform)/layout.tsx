import { Header } from "@/components/elementary/Header"

interface PlatformLayoutProps {
  children: React.ReactNode
}

const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children }) => {
  return (
    <div className="size-full">
      <Header />
      <div className="size-full">{children}</div>
    </div>
  )
}

export default PlatformLayout
