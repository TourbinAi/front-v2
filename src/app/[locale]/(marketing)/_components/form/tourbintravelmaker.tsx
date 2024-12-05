"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { useRouter } from "@/i18n/navigation";
import SubmitButton from "@/components/forms/SubmitButton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/Form";
import arrowX from "public/assets/icons/Polygon 2.png";
import arrowY from "public/assets/icons/Polygon 1.png";
import Image from "next/image";
import { TravelMakerForm } from "./travelMakerForm";
import { useTravelMakerForm } from "@/hooks/usereacthoojform";
import {
  SidebarSchema,
  TravelMakerSelectValues as tmsv,
} from "@/lib/validation/travelMaker";
export const Tourbintravelmaker = () => {
  const videoPaths: {
    [key: string]: { nextVideos: { label: string; src: string }[] };
  } = {
    "/assets/video/intro-1-1.mp4": {
      nextVideos: [
        { label: "مشهد", src: "/assets/video/intro-1-2.mp4" },
        { label: "تهران", src: "/assets/video/intro-1-3.mp4" },
        { label: "شیراز", src: "/assets/video/intro-1-4.mp4" },
      ],
    },
    "/assets/video/intro-1-2.mp4": {
      nextVideos: [
        { label: "1", src: "/assets/video/intro-2-1.mp4" },
        { label: "2", src: "/assets/video/intro-2-2.mp4" },
        { label: "3", src: "/assets/video/intro-2-2.mp4" },
      ],
    },
    "/assets/video/intro-1-3.mp4": {
      nextVideos: [
        { label: "4", src: "/assets/video/tehran-1.mp4" },
        { label: "ادامه تهران 5", src: "/assets/video/tehran-2.mp4" },
      ],
    },
    "/assets/video/intro-1-4.mp4": {
      nextVideos: [
        { label: "6", src: "/assets/video/shiraz-1.mp4" },
        { label: "7", src: "/assets/video/shiraz-2.mp4" },
      ],
    },
  };
  const t = useTranslations("landingPage.featureDetails.travelMaker");
  const [isLoading, setIsLoading] = useState(false);
  const [isopen, setIsopen] = useState(false);
  const [isVideoended, setIsvideoedned] = useState(false);
  const router = useRouter();

  const handleNextVideo = (videoUrl: string) => {
    const videoElement = document.getElementById(
      "videoPlayer"
    ) as HTMLVideoElement;
    videoElement.src = videoUrl;
    videoElement.play();
    setIsvideoedned(false);
  };
  const form = useTravelMakerForm();
  const onSubmit = async (values: z.infer<typeof SidebarSchema>) => {
    // console.log("yes");
    const queryParams = new URLSearchParams(values as any).toString();
    router.push(`/travelMaker?${queryParams}`);
  };
  console.log(form.getValues());
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Button className="hidden w-full justify-between bg-[#EE4037] p-7 text-white lg:flex">
          {t("fillTheForm")}
          <Image src={arrowY} alt={""} />
        </Button>
        <Button className="flex w-full justify-between bg-[#EE4037] p-7 text-white lg:hidden">
          {t("talkToAI")}
          <Image src={arrowX} alt={""} />
        </Button>
        <div className="mx-10 flex justify-center rounded-xl bg-[#ECEDFD] lg:hidden">
          <div className="itmes-center relative flex h-full items-end justify-center">
            <video
              id="videoPlayer"
              controls={false} // This makes the video player interactive (play/pause, etc.)
              onEnded={() => setIsvideoedned(true)} // Triggered when the video ends
              className="h-full" // Optional: to set the video size
            >
              <source src="/assets/video/intro-1-1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* {isVideoended && console.log("ended")} */}
            <Button
              onClick={() => {
                const videoElement = document.getElementById(
                  "videoPlayer"
                ) as HTMLVideoElement;
                videoElement?.play();
              }}
              className="absolute z-20 translate-y-6 bg-[#EE4037] px-24 py-7 text-white"
            >
              {t("clickToStart")}
            </Button>
          </div>
        </div>
        <Button
          onClick={() => {
            setIsopen(!isopen);
          }}
          className="mt-10 flex w-full justify-between p-7 text-[#5C61F1]"
          href="/blog"
        >
          hhuh?
          <Image
            className={isopen ? "rotate-180" : "rotate-0"}
            src={arrowY}
            alt={""}
          />
        </Button>
        {isopen ? <TravelMakerForm /> : <></>}
      </div>
    </form>
  );
};
