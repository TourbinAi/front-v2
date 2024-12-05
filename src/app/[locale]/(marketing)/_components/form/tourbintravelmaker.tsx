"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useRouter } from "@/i18n/navigation"
import { souvenirsAndFood } from "@/lib/validation/landing"
import CustomFormField, {
  FormFieldType,
} from "@/components/forms/CustomeFormField"
import SubmitButton from "@/components/forms/SubmitButton"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/Form"
import arrowX from "public/assets/icons/Polygon 2.png"
import arrowY from "public/assets/icons/Polygon 1.png"
import Image from "next/image"
import cameraman1Small from "public/assets/images/cameramanONESMALL.png"
import { TravelMakerForm } from "./travelMakerForm"
import { useTravelMakerForm } from "../../../../../hooks/usereacthoojform"
import {
  SidebarSchema,
  TravelMakerSelectValues as tmsv,
} from "@/lib/validation/travelMaker"
import VideoPlayer from "../ui/videoplayer"

export const Tourbintravelmaker = () => {
  const t = useTranslations("landingPage.featureDetails.tourbinTravelMaker")
  const [isLoading, setIsLoading] = useState(false)
  const [isopen, setIsopen] = useState(false)
  const [ started , setStarted] =useState(false)
  const router = useRouter()
  const form = useTravelMakerForm()
  const onSubmit = async (values: z.infer<typeof SidebarSchema>) => {
    // console.log("yes");
    const queryParams = new URLSearchParams(values as any).toString()
    router.push(`/travelMaker?${queryParams}`)
  }
  


  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 " >
        <SubmitButton className="hidden w-full lg:flex justify-between bg-[#EE4037] text-white p-7" isLoading={isLoading}>{t("form.goTo")}
          <Image src={arrowY} alt={''} />
        </SubmitButton>
        <SubmitButton className="lg:hidden w-full flex justify-between bg-[#EE4037] text-white p-7" isLoading={isLoading}>{t("form.goTo")}
          <Image src={arrowX} alt={''} />
        </SubmitButton>
        <div className="flex justify-center lg:hidden bg-[#ECEDFD]  mx-10 rounded-xl">
        <div className=" relative flex itmes-center items-end justify-center h-full">
          <VideoPlayer initialVideoStarted={started}/>
          <Button onClick={() => {
              setStarted(true)
            }} className="absolute bg-[#EE4037]  z-20 text-white py-7 px-24 translate-y-6 " >برای شروع کلیک کنید</Button>
          </div>
        </div>

      </div>

      <Button onClick={()=>{setIsopen(!isopen)}} className=" w-full flex text-black justify-between text-[#5C61F1] mt-10 p-7" href="/blog">
        {t("form.collapseButton")}
        <Image className={isopen ? "rotate-180" : "rotate-0"} src={arrowY} alt={''} />
      </Button>
      {isopen ?<TravelMakerForm/> :<></>}
      
    </form>
  )
}
export default Tourbintravelmaker