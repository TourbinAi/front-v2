"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CustomVideoPlayerProps {
  className?: string;
  canPause?: boolean;
  videoUrl: string | { src: string };
  onEnded?: () => void;
  videoRef?: React.RefObject<HTMLVideoElement>;
  isEnded?: boolean;
  setIsEnded?: (ended: boolean) => void;
  isPlaying?: boolean;
  setIsPlaying?: (playing: boolean) => void;
  isPathFinder?: boolean;
}

export default function CustomVideoPlayer({
  className,
  canPause = true,
  videoUrl,
  onEnded = () => {},
  videoRef: videoRefProp,
  isEnded: externalIsEnded,
  setIsEnded: externalSetIsEnded,
  isPlaying: externalIsPlaying,
  setIsPlaying: externalSetIsPlaying,
  isPathFinder = false,
}: CustomVideoPlayerProps) {
  const [internalIsEnded, setInternalIsEnded] = useState(false);
  const [internalIsPlaying, setInternalIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRefObject = useRef<HTMLVideoElement>(null);
  const videoRef = videoRefProp || videoRefObject;

  const isEnded = externalIsEnded ?? internalIsEnded;
  const setIsEnded = externalSetIsEnded ?? setInternalIsEnded;
  const isPlaying = externalIsPlaying ?? internalIsPlaying;
  const setIsPlaying = externalSetIsPlaying ?? setInternalIsPlaying;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying && canPause) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setIsEnded(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setIsEnded(true);
    onEnded();
  };

  const handleDOMError = (event: ErrorEvent) => {
    console.error("Video error:", event);
    toast.error("Failed to load video. Please check your internet connection.");
    setIsEnded(true);
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
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        className={cn("h-full w-full object-cover", hasError && "hidden")}
        src={videoSrc}
        loop={false}
        playsInline
        onEnded={onEnded}
        onError={handleError}
      />
      {hasError && (
        <div className="flex size-full flex-col items-center justify-center gap-2 bg-gray-100">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <p className="text-sm text-gray-600">Video failed to load</p>
        </div>
      )}
      {!hasError && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            (isHovering && (canPause || !isPlaying)) || isEnded
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <button
            onClick={isEnded ? restartVideo : togglePlay}
            className="rounded-full bg-black bg-opacity-50 p-4 text-white transition-colors duration-300 hover:bg-opacity-75"
          >
            {isEnded ? (
              <RotateCcw size={24} />
            ) : isPlaying && canPause ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
