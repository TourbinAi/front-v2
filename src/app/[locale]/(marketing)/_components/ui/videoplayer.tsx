import { Button } from "@/components/ui/button";
import { useState } from "react";
import { string } from "zod";

interface Types {
    initialVideoStarted: boolean;
  }

export  const VideoPlayer: React.FC<Types> =({initialVideoStarted = false})=>{

const [isVideoended, setIsvideoedned] = useState(false)
const [buttons, setButtons] = useState<{ label: string; src: string }[]>()
const [currentVideo, setCurrentVideo] = useState("/assets/video/intro-1-1.mp4")
const [videoStarted, setVideoStarted] = useState(initialVideoStarted);
const videoPaths: { [key: string]: { nextVideos: { label: string; src: string }[] } } = {

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
        { label: "3", src: "/assets/video/intro-2-2.mp4" }
      ],
    },
    "/assets/video/intro-1-3.mp4": {
      nextVideos: [
        { label: "4", src: "/assets/video/tehran-1.mp4" },
        { label: "5", src: "/assets/video/tehran-2.mp4" },
      ],
    },
    "/assets/video/intro-1-4.mp4": {
      nextVideos: [
        { label: "6", src: "/assets/video/shiraz-1.mp4" },
        { label: "7", src: "/assets/video/shiraz-2.mp4" },
      ],
    },
  }
 const handleVideoPlay = () => {

    const videoElement = document.getElementById('videoPlayer') as HTMLVideoElement
    videoElement.play()
    setIsvideoedned(false)
    const video = videoPaths[currentVideo]?.nextVideos
    setButtons(video)
  }
    const nextVideo = () => {
    const video = videoPaths[currentVideo]?.nextVideos || []
    setButtons(video)
    setIsvideoedned(true)
  }
  
   const handleNextVideos = (videoSrc: string) => {
    setCurrentVideo(videoSrc)
    setIsvideoedned(false)
    setButtons([])
  }

    
    return(<>

            <video
              id="videoPlayer"
              controls={false}
              onEnded={nextVideo}
              className="h-[50vh] bg-white"
              onPlay={()=>setVideoStarted(true)}
            >
              <source src={currentVideo} type="video/mp4" />
            </video>
            {isVideoended && (<>
              <div className="absolute bottom-10 z-30 w-full flex justify-center gap-4">
                {buttons?.map((button, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      handleNextVideos(button.src); handleVideoPlay; const videoElement = document.getElementById('videoPlayer') as HTMLVideoElement
                      videoElement?.play()
                    }}
                    className="bg-[#EE4037] text-white py-2 px-4"
                  >
                    {button.label}
                  </Button>
                ))}
              </div>
            </>)}
            
            
    </>)
}
export default VideoPlayer