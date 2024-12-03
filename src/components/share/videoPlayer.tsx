"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface CustomVideoPlayerProps {
  canPause?: boolean;
  videoUrl: string;
}

export default function CustomVideoPlayer({
  canPause = true,
  videoUrl,
}: CustomVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      className="relative size-full overflow-hidden rounded-lg border-4 border-gray-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={videoUrl}
        loop={false}
        playsInline
      />
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          (isHovering && (canPause || !isPlaying)) || isEnded
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        {isEnded ? (
          <AlertTriangle size={24} className="text-red-500" />
        ) : (
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
        )}
      </div>
    </div>
  );
}
