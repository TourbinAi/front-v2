import { ImageWithPlaiceholder } from "@/components/elementary/ImageWithPlaiceholder";
import Image from "next/image";



export default function ImageHolder() {
    return (
        <div className="m-1 w-full lg:w-[33vw] h-[48vh] flex justify-center">
            <ImageWithPlaiceholder
                className="w-full h-full rounded-sm"
                src={"https://get.pxhere.com/photo/man-person-male-portrait-professional-profession-speaker-senior-citizen-elder-face-expression-adult-business-executive-ben-knapen-1068652.jpg"}
                alt="dada"
            />
        </div>
    )
}