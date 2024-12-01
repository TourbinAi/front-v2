import Image, { StaticImageData } from "next/image"
import { FeatureDetailsType } from "@/constants"
import { useTranslations } from "next-intl"
import outlinedCompass from "public/assets/images/compass_outlined.png"
import cameraMan2 from "public/assets/images/cameramanTWO.png"
import cameraMan3 from "public/assets/images/cameramanTHREE.png"
import cameraMan4 from "public/assets/images/cameramanFOUR.png"
import outlinedMagnifier from "public/assets/images/magnifier_outlined.png"
import magnifier from "public/assets/images/magnifier.webp"
import outlinedMarket from "public/assets/images/market_outlined.png"
import market from "public/assets/images/market.webp"
import cameraMan1 from "public/assets/images/111 1 (1).png"
import outlinedRitual from "public/assets/images/ritual_outlined.png"
import ritual from "public/assets/images/ritual.webp"
import outlinedTent from "public/assets/images/tent_outlined.png"
import arrow from "public/assets/images/Polygon 2.png"
import { cn } from "@/lib/styles"
import { Button } from "@/components/ui/button"
import bgRectangle from 'public/assets/images/bgRectangle.png'
import { CelebrationsAndEventForm } from "./form/celebrationsAndEventsForm"
import { PathFinderForm } from "./form/pathFinderForm"
import { SouvenirsAndFoodForm } from "./form/souvenirsAndFoodForm"
import { TravelMakerForm } from "./form/travelMakerForm"
import { Tourbintravelmaker } from "./form/tourbintravelmaker"
import { url } from "inspector"

interface SectionProps {
  dir: "ltr" | "rtl"
  name: FeatureDetailsType | "about"
  children: React.ReactNode
  image: StaticImageData | string
  outlinedImage: StaticImageData | string
  buttons:Boolean,
}

function Section({
  dir = "ltr",
  name,
  children,
  image,
  outlinedImage,
  buttons,
  
}: SectionProps) {
  const t = useTranslations(`landingPage.featureDetails.${name}`)
  return (
    <div
      id={name}
      className={cn(
        "flex min-h-0 flex-col  justify-between lg:min-h-[600px] lg:justify-center ",
        dir == "ltr" ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
      
    >
      <div className="flex justify-center bg-[#ECEDFD] hidden w-[35%] lg:flex mx-10 rounded-xl">
        <div className="relative flex itmes-center items-end justify-center ">
          <Image
            alt="compass object-fit "
            src={outlinedImage}
            className={cn(
              "h-auto w-full object-fill",
              dir === "ltr" ? "right-0" : "left-0"
            )}
          />
          {buttons ? <Button className="absolute bg-[#EE4037]  z-20 text-white py-4 px-8 translate-y-6" >برای شروع کلیک کنید</Button> : <></>}
        </div>
      </div>
      <div className="lg:hidden">
        <Image
          alt="compass"
          src={image}
          className="aspect-video object-cover"
        />
      </div>
      <div className="flex grow flex-col items-center w-[50%] justify-center text-xl">
        <div className=" max-w-[600px]">
          <section className="space-y-2 self-stretch p-4">
            <h2 className="text-2xl font-semibold">{t("title")}</h2>
            <p>{t("description")}</p>
          </section>
          <div className="px-4 pb-8">{children}</div>
        </div>
      </div>
    </div>
  )
}

export function FeatureDetails() {
  const t = useTranslations("landingPage.featureDetails")

  return (
    <div className="flex w-full flex-col justify-stretch gap-10">

      <Section 
        dir="rtl"
        name="about"
        image={cameraMan1} 
        outlinedImage={cameraMan1} 
        buttons={true}
        >
        <Tourbintravelmaker/>
      </Section>
      <Section
        dir="ltr"
        name="routeFinder"
        image={cameraMan2}
        outlinedImage={cameraMan2}
        buttons={false}
      >
        <PathFinderForm />
      </Section>
      <Section
        dir="rtl"
        name="souvenirsAndFood"
        image={cameraMan3}
        outlinedImage={cameraMan3}
        buttons={false}
      >
        <SouvenirsAndFoodForm />
      </Section>
      <Section
        dir="ltr"
        name="celebrationsAndEvents"
        image={cameraMan4}
        outlinedImage={cameraMan4}
        buttons={false}
      >
        <CelebrationsAndEventForm />
      </Section>
    </div>
  )
}
