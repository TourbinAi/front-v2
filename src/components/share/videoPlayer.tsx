"use client";

import { useRef, useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CustomVideoPlayerProps {
  className?: string;
  videoUrl: string | { src: string };
  onEnded?: () => void;
  videoRef?: React.RefObject<HTMLVideoElement>;
  isPathFinder?: boolean;
}

export default function CustomVideoPlayer({
  className,
  videoUrl,
  onEnded = () => {},
  videoRef: videoRefProp,
  isPathFinder = false,
}: CustomVideoPlayerProps) {
  const [hasError, setHasError] = useState(false);
  const videoRefObject = useRef<HTMLVideoElement>(null);
  const videoRef = videoRefProp || videoRefObject;

  const handleVideoEnd = () => {
    onEnded();
  };

  const handleDOMError = (event: ErrorEvent) => {
    console.error("Video error:", event);
    toast.error("Failed to load video. Please check your internet connection.");
    setHasError(true);
  };

  const handleError = (
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    handleDOMError(event.nativeEvent as ErrorEvent);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", handleVideoEnd);
      video.addEventListener("error", handleDOMError);

      return () => {
        video.removeEventListener("ended", handleVideoEnd);
        video.removeEventListener("error", handleDOMError);
      };
    }
  }, []);

  let videoSrc = "";
  if (isPathFinder) {
    videoSrc =
      typeof videoUrl === "string"
        ? `/assets/videos/pck/${videoUrl}.mp4`
        : `/assets/videos/pck/${videoUrl.src}.mp4`;
  } else {
    videoSrc = typeof videoUrl === "string" ? videoUrl : videoUrl.src;
  }

  return (
    <div
      className={cn(
        "relative size-full overflow-hidden rounded-lg border-4 border-gray-300",
        className
      )}
    >
      <video
        ref={videoRef}
        className={cn("h-full w-full object-cover", hasError && "hidden")}
        src={videoSrc}
        loop={false}
        playsInline
        autoPlay
        onEnded={onEnded}
        onError={handleError}
      />
      {hasError && (
        <div className="flex size-full flex-col items-center justify-center gap-2 bg-gray-100">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <p className="text-sm text-gray-600">Video failed to load</p>
        </div>
      )}
    </div>
  );
}
