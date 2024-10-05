"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/Form";
import { celebrationsAndEvents } from "@/lib/validation/landing";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { useRouter } from "next/navigation";

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

  const onSubmit = async (values: z.infer<typeof celebrationsAndEvents>) => {
    setIsLoading(true);
    router.push("");
    try {
      console.log("values: ", values);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex-1 space-y-4"
      >
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="occasion"
          label={t("form.occasion.title")}
          placeholder={t("form.occasion.placeholder")}
          iconLucid="MapPinned"
          iconAlt="origin"
        />
        <div className="flex flex-row items-center gap-2">
          <Label className="m-0 text-nowrap">{t("form.month.title")}</Label>
          <Select>
            <SelectTrigger className="flex items-center justify-center">
              <SelectValue placeholder={t("form.month.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {months.map((month, i) => (
                  <SelectItem
                    key={i}
                    value={month}
                    className="w-full text-right"
                  >
                    <div className="flex w-full cursor-pointer flex-row items-center gap-2 border border-red-400 ltr:flex-row-reverse">
                      <p>{t(`form.month.options.${month}`)}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <SubmitButton className="mb-1 w-full" isLoading={isLoading}>
          {t("form.submit")}
        </SubmitButton>
        <Button className="w-full" variant="outline" href="/blog">
          {t("form.goTo")}
        </Button>
      </form>
    </Form>
  );
};
