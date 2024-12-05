import Image, { StaticImageData } from "next/image";
import { FeatureDetailsType } from "@/constants";
import { useTranslations } from "next-intl";
import outlinedCompass from "public/assets/images/compass_outlined.png";
import cameraMan2 from "public/assets/images/cameramanTWO.png";
import cameraMan3 from "public/assets/images/cameramanTHREE.png";
import cameraMan4 from "public/assets/images/cameramanFOUR.png";
import cameraman1Small from "public/assets/images/cameramanONESMALL.png";
import cameraMan1 from "public/assets/images/cameramanONE.png";
import bgImage from "public/assets/images/Rectangle 43.png";
import bgpicture from "public/assets/images/Rectangle 55.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CelebrationsAndEventForm } from "../form/celebrationsAndEventsForm";
import { PathFinderForm } from "../form/pathFinderForm";
import { SouvenirsAndFoodForm } from "../form/souvenirsAndFoodForm";
import { Tourbintravelmaker } from "../form/tourbintravelmaker";

interface SectionProps {
  dir: "ltr" | "rtl";
  name: FeatureDetailsType | "travelMaker";
  children: React.ReactNode;
  image: StaticImageData | string;
  outlinedImage: StaticImageData | string;
  buttons: Boolean;
  bgColor: boolean;
  responsiveText: boolean;
}
const direction = "ltr";
function Section({
  dir = "ltr",
  name,
  children,
  image,
  outlinedImage,
  buttons,
  bgColor,
  responsiveText,
}: SectionProps) {
  const t = useTranslations(`landingPage.featureDetails.${name}`);
  return (
    <div
      id={name}
      className={cn(
        "z-10 flex min-h-0 flex-col items-center justify-center lg:mx-20 lg:min-h-[600px] lg:justify-around",
        dir == "ltr" ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      <div
        className={
          bgColor
            ? "mx-10 flex w-[35%] justify-center rounded-xl bg-[#ECEDFD] lg:flex"
            : "mx-10 flex w-[35%] justify-center rounded-xl lg:flex"
        }
      >
        <div className="itmes-center relative flex items-end justify-center">
          <Image
            alt="compass object-cover "
            src={outlinedImage}
            className={cn(
              "object-fit h-full w-full",
              dir === "ltr" ? "right-0" : "left-0"
            )}
          />
          {buttons ? (
            <Button className="absolute z-20 translate-y-6 bg-[#EE4037] px-24 py-7 text-white opacity-80 hover:opacity-100">
              برای شروع کلیک کنید
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        {responsiveText ? (
          <div className="mt-10 flex w-full grow flex-col items-center justify-center text-xl">
            <div className="flex w-full max-w-[600px]">
              <section className="w-full space-y-2 self-stretch p-4">
                <h2 className="text-2xl font-semibold">{t("title")}</h2>
                <p>{t("description")}</p>
              </section>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="px-4 pb-8">{children}</div>
      </div>
    </div>
  );
}

export function FeatureDetails() {
  const t = useTranslations("landingPage.featureDetails");

  return (
    <div className="flex w-full flex-col gap-10">
      <Section
        dir="rtl"
        name="travelMaker"
        image={cameraman1Small}
        outlinedImage={cameraMan1}
        buttons={true}
        bgColor={true}
        responsiveText={true}
      >
        <Tourbintravelmaker />
      </Section>
      <div className="relative">
        <Section
          dir="ltr"
          name="routeFinder"
          image={cameraMan2}
          outlinedImage={cameraMan2}
          buttons={false}
          bgColor={false}
          responsiveText={true}
        >
          <PathFinderForm />
        </Section>
        <Image
          className="object-fit absolute left-0 top-0 -z-10 h-full w-screen"
          src={bgImage}
          alt=""
        />
      </div>
      <div className="relative mt-2 flex flex-col gap-4">
        <Section
          dir="rtl"
          name="souvenirsAndFood"
          image={cameraMan3}
          outlinedImage={cameraMan3}
          buttons={false}
          bgColor={false}
          responsiveText={true}
        >
          <SouvenirsAndFoodForm />
        </Section>
        <Section
          dir="ltr"
          name="celebrationsAndEvents"
          image={cameraMan4}
          outlinedImage={cameraMan4}
          buttons={false}
          bgColor={false}
          responsiveText={false}
        >
          <CelebrationsAndEventForm />
        </Section>
        <Image
          className="object-fit absolute left-0 top-0 -z-10 hidden h-full w-full lg:block"
          src={bgpicture}
          alt=""
        />
      </div>
    </div>
  );
}
