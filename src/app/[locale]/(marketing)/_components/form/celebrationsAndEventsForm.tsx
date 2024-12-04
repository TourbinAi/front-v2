"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { celebrationsAndEvents } from "@/lib/validation/landing";
import { Form } from "@/components/ui/Form";

import "react-phone-number-input/style.css";

import * as Sentry from "@sentry/nextjs";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import cameraman3Small from "public/assets/images/cameramanTHREESMALL.png";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import Image from "next/image";

const months = [
  "farvardin",
  "ordibehesht",
  "khordad",
  "tir",
  "mordad",
  "shahrivar",
  "mehr",
  "aban",
  "azar",
  "day",
  "bahman",
  "esfand",
] as const;

export const CelebrationsAndEventForm = () => {
  const t = useTranslations("landingPage.featureDetails.celebrationsAndEvents");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof celebrationsAndEvents>>({
    resolver: zodResolver(celebrationsAndEvents),
    defaultValues: {
      occasion: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    router.push("/blog/event/?blogtype=3&blogid=3");
    try {
      setIsLoading(true);
      router.push("/blog/event/?blogtype=3&blogid=3");
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex-1 space-y-4"
      >
        <div className="-mb-4 flex items-end justify-between lg:m-0">
          <div className="w-[55%] lg:w-full">
            <div className="flex w-full grow flex-col items-center justify-center lg:w-full">
              <div className="max-w-[600px]">
                <section className="space-y-2 self-stretch p-4">
                  <h2 className="text-xl font-semibold">{t("title")}</h2>
                  <p>{t("description")}</p>
                </section>
              </div>
            </div>
            <div className="p-2">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="occasion"
                // label={t("form.occasion.title")}
                placeholder={t("form.occasion.placeholder")}
                // iconLucid="MapPinned"
                // iconAlt="origin"
              />
              <div className="flex flex-row items-center gap-2">
                {/* <Label className="m-0 text-nowrap">{t("form.month.title")}</Label> */}
                <Select>
                  <SelectTrigger className="flex items-center justify-center rounded-2xl border-[#5C61F1] text-[#5C61F1] opacity-60 lg:text-xl">
                    <SelectValue
                      className="placeholder-opacity-50"
                      placeholder={t("form.month.placeholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {months.map((month, i) => (
                        <SelectItem
                          key={i}
                          value={month}
                          className="flex w-full items-center justify-end text-right"
                        >
                          <div className="flex w-full cursor-pointer flex-row items-center gap-2 ltr:flex-row-reverse">
                            <p>{t(`form.month.options.${month}`)}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="w-[45%] rounded-xl lg:hidden lg:w-full">
            <div className="relative flex h-full items-end justify-end">
              <Image
                alt="compass"
                src={cameraman3Small}
                className="h-full object-cover"
              />
            </div>
          </div>
        </div>
        <SubmitButton isLoading={isLoading}>{t("form.submit")}</SubmitButton>
      </form>
      <Button
        className="mt-2 w-full text-[#5C61F1]"
        variant="outline"
        href="/blog"
      >
        {t("form.goTo")}
      </Button>
    </Form>
  );
};
