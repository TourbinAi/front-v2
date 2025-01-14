import { Header } from "@/components/elementary/Header"

interface PlatformLayoutProps {
  children: React.ReactNode
}

const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col justify-stretch items-stretch">
      <Header />
      {children}
    </div>
  )
}

export default PlatformLayout
