import Footer from "../_components/Footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

const MarketingLayout: React.FC<MarketingLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default MarketingLayout
