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

export const CelebrationsAndEventForm = () => {
  const t = useTranslations("landingPage.featureDetails.celebrationsAndEvents");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof celebrationsAndEvents>>({
    resolver: zodResolver(celebrationsAndEvents),
    defaultValues: {
      occasion: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof celebrationsAndEvents>) => {
    setIsLoading(true);

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
        <div className="flex items-end justify-center gap-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occasion"
            label={t("form.occasion.title")}
            placeholder={t("form.occasion.placeholder")}
            iconLucid="MapPinned"
            iconAlt="origin"
          />
          <SubmitButton
            className="mb-1 w-32 -translate-y-4"
            isLoading={isLoading}
          >
            {t("form.submit")}
          </SubmitButton>
        </div>
        <Button className="w-full" variant="outline" href="/blog">
          {t("form.goTo")}
        </Button>
      </form>
    </Form>
  );
};
