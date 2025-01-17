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
      <div className="flex h-[calc(100vh-2.5rem)] items-stretch justify-stretch gap-5 overflow-hidden p-5">
        <Card className="m-0 hidden h-full w-[500px] min-w-[500px] lg:block">
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
              name="sidebar"
              variant="outline"
              className="flex size-14 items-center justify-center rounded-full"
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
