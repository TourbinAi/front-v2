import React, { Dispatch, SetStateAction } from "react"
import { PanelRightClose, PanelRightOpen } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/styles"
import { useIsMobile } from "@/hooks/useIsMobile"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scrollArea"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type SheetLayoutProps = {
  children: React.ReactNode
  sideBarComponent: React.ReactNode
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  button?: boolean
}

const SheetLayout: React.FC<SheetLayoutProps> = ({
  children,
  sideBarComponent,
  open,
  setOpen,
  button = true,
}) => {
  const t = useTranslations("travelMaker.form.form-header")
  const locale = useLocale()
  const isMobile = useIsMobile()
  const dir = locale === "fa" ? "rtl" : "ltr"
  return (
    <>
      <div className="flex h-[calc(100vh-2.5rem)] items-stretch justify-stretch gap-5 p-5 overflow-hidden">
        <Card className="hidden lg:block min-w-[500px] h-full m-0 w-[500px]">
          <ScrollArea className="h-full">
            <CardHeader className="flex w-full flex-col items-center justify-center">
              <CardTitle className="pb-2">{t("title")}</CardTitle>
              <CardDescription className="text-center">
                {t("text")}
              </CardDescription>
            </CardHeader>
            <CardContent>{sideBarComponent}</CardContent>
          </ScrollArea>
        </Card>
        <div className="min-w-0 flex-1 overflow-hidden">{children}</div>
      </div>
      {isMobile && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            asChild
            className={cn(
              "absolute bottom-4",
              dir === "rtl" ? "right-4" : "left-4",
              button ? "block lg:hidden" : "hidden"
            )}
          >
            <Button
              variant="outline"
              className="size-14 flex justify-center items-center rounded-full"
            >
              {open ? <PanelRightClose /> : <PanelRightOpen />}
            </Button>
          </SheetTrigger>
          <SheetContent
            className="bg-white"
            side={dir === "rtl" ? "right" : "left"}
          >
            {sideBarComponent}
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}

export default SheetLayout
