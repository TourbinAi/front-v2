"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CustomVideoPlayerProps {
  className?: string;
  canPause?: boolean;
  videoUrl: string;
  onEnded?: () => void;
  videoRef?: React.RefObject<HTMLVideoElement>;
  isEnded?: boolean;
  setIsEnded?: (ended: boolean) => void;
  isPlaying?: boolean;
  setIsPlaying?: (playing: boolean) => void;
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
}: CustomVideoPlayerProps) {
  const [internalIsEnded, setInternalIsEnded] = useState(false);
  const [internalIsPlaying, setInternalIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
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

  const handleError = (event: Event) => {
    console.error("Video error:", event);
    toast.error("Failed to load video. Please check your internet connection.");
    setIsEnded(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", handleVideoEnd);
      video.addEventListener("error", handleError);

      return () => {
        video.removeEventListener("ended", handleVideoEnd);
        video.removeEventListener("error", handleError);
      };
    }
  }, []);

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
        className="h-full w-full object-cover"
        src={videoUrl}
        loop={false}
        playsInline
        onEnded={onEnded}
      />
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
    </div>
  );
}
