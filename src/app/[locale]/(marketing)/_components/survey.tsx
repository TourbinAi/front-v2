"use client";

import { useRef, useState } from "react";
import VideoPlayer from "@/components/share/videoPlayer";
import SurveyOptions from "./surveyOptions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

import cameraManONE from "public/assets/images/cameramanONE.png";
import { useRouter } from "@/i18n/navigation";

// Import videos from public directory
const videos = {
  draft: "/assets/videos/draft.mp4",
  intro1: "/assets/videos/intro-1-1.mp4",
  intro2: "/assets/videos/intro-1-2.mp4",
  intro3: "/assets/videos/intro-1-3.mp4",
  intro4: "/assets/videos/intro-1-4.mp4",
};

// Update the surveyData to use the imported videos
type Question = {
  id: number;
  questionId: number;
  text: string;
  video: string;
  options?: Question[];
};

export default function Survey() {
  const duration: Question[] = [
    {
      questionId: 3,
      id: 1,
      text: "یک روز",
      video: videos.intro4,
    },
    {
      questionId: 3,
      id: 2,
      text: "دو روز",
      video: videos.intro4,
    },
    {
      questionId: 3,
      id: 3,
      text: "سه روز",
      video: videos.intro4,
    },
  ];

  const distance: Question[] = [
    {
      questionId: 2,
      id: 1,
      text: "سه ساعت",
      video: videos.intro3,
      options: duration,
    },
    {
      questionId: 2,
      id: 2,
      text: "پنج ساعت",
      video: videos.intro3,
    },
    {
      questionId: 2,
      id: 3,
      text: "هفت ساعت",
      video: videos.intro3,
      options: duration,
    },
  ];

  const surveyData: Question = {
    questionId: 0,
    id: 1,
    text: "شروع کنید",
    video: videos.intro1,
    options: [
      {
        questionId: 1,
        id: 1,
        text: "تهران",
        video: videos.draft,
        options: distance,
      },
      {
        questionId: 1,
        id: 2,
        text: "مشهد",
        video: videos.intro2,
        options: distance,
      },
      {
        questionId: 1,
        id: 3,
        text: "اصفهان",
        video: videos.draft,
        options: distance,
      },
    ],
  };

  const [surveyStarted, setSurveyStarted] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Question>(surveyData);
  const [showOptions, setShowOptions] = useState(false);
  const [surveyComplete, setSurveyComplete] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [surveyResults, setSurveyResults] = useState<{
    origin?: string;
    duration?: string;
    distance?: string;
  }>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const t = useTranslations("landingPage.featureDetails.travelMaker");

  const handleVideoEnd = () => {
    setShowOptions(true);
  };

  const handleRedirect = () => {
    router.push(
      `/travelMaker/?origin=${surveyResults.origin}&distance=${surveyResults.distance}&tags=sunnyAndSea&duration=${surveyResults.duration}&route=easy&vehicle=car&routStop=oneWay&direction=north&oldPerson=false&accommodation=visit&date=[object+Object]`
    );
  };

  const handleOptionSelect = async (nextQuestion: Question) => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
      try {
        if (nextQuestion.questionId === 1) {
          setSurveyResults({
            ...surveyResults,
            origin: nextQuestion.text,
          });
        } else if (nextQuestion.questionId === 2) {
          setSurveyResults({
            ...surveyResults,
            distance:
              nextQuestion.id === 1
                ? "3h"
                : nextQuestion.id === 2
                  ? "5h"
                  : "7h",
          });
        } else if (nextQuestion.questionId === 3) {
          setSurveyResults({
            ...surveyResults,
            duration:
              nextQuestion.id === 1
                ? "1d"
                : nextQuestion.id === 2
                  ? "2d"
                  : "3d",
          });
        }
        setCurrentVideo(nextQuestion);
        setShowOptions(false);
        setIsVideoEnded(false);
        if (!nextQuestion.options) {
          setSurveyComplete(true);
        }

        if (videoRef.current) {
          await videoRef.current.load();
          videoRef.current.play().catch(console.error);
          setIsVideoPlaying(true);
        }
      } catch (error) {
        console.error("Error switching videos:", error);
      }
    }
  };

  const startSurvey = () => {
    setSurveyComplete(false);
    setSurveyResults({});
    setCurrentVideo(surveyData);
    setIsVideoEnded(false);
    videoRef.current?.play();
    setSurveyStarted(true);
  };

  if (!surveyStarted) {
    return (
      <div className="mx-10 flex justify-center rounded-xl">
        <div className="itmes-center relative flex h-full items-end justify-center">
          <Image src={cameraManONE} alt={""} />

          <Button
            onClick={startSurvey}
            className="absolute z-20 translate-y-6 bg-[#EE4037] px-24 py-7 text-white"
          >
            {t("clickToStart")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <VideoPlayer
        videoRef={videoRef}
        className="aspect-square sm:w-full"
        videoUrl={currentVideo.video}
        onEnded={handleVideoEnd}
        isEnded={isVideoEnded}
        setIsEnded={setIsVideoEnded}
        isPlaying={isVideoPlaying}
        setIsPlaying={setIsVideoPlaying}
      />
      {showOptions && !surveyComplete && (
        <div className="mt-2 flex w-full flex-row items-center justify-center gap-4">
          {currentVideo.options?.map((option) => (
            <Button
              className="hover:cursor-pointer"
              onClick={() => handleOptionSelect(option)}
              key={option.text}
            >
              {option.text}
            </Button>
          ))}
        </div>
      )}
      {surveyComplete && (
        <div className="mt-4 flex items-center justify-center gap-4 text-center">
          <Button onClick={startSurvey}>شروع مجدد</Button>
          <Button onClick={handleRedirect}>دیدن نتایج</Button>
        </div>
      )}
    </div>
  );
}
