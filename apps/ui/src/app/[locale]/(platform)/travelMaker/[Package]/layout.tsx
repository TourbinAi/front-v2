import Gallery from "./_components/gallery"
import ImageHolder from "./_components/ImageHolder"
import TravelPlane from "./_components/travelplane"
import TravelText from "./_components/trevelText"
import MapPage from "./map/page"

interface PlatformLayoutProps {
  children: React.ReactNode
}

const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex gap-1 flex-col xl:flex-row m-1">
        <TravelText />
        <MapPage />
      </div>
      <div className="flex gap-2 flex-col lg:flex-row m-1">
        <TravelPlane />
        <Gallery />
        <ImageHolder />
      </div>
    </>
  )
}

export default PlatformLayout
