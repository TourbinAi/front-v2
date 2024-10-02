"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/Form";
import { souvenirsAndFood } from "@/lib/validation/landing";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export const SouvenirsAndFoodForm = () => {
  const t = useTranslations("landingPage.featureDetails.souvenirsAndFood");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof souvenirsAndFood>>({
    resolver: zodResolver(souvenirsAndFood),
    defaultValues: {
      food: "",
      city: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof souvenirsAndFood>) => {
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
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="food"
          label={t("form.food.title")}
          placeholder={t("form.food.placeholder")}
          iconLucid="CookingPot"
          iconAlt="food"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="city"
          label={t("form.city.title")}
          placeholder={t("form.city.placeholder")}
          iconLucid="Building2"
          iconAlt="city"
        />

        <SubmitButton isLoading={isLoading}>{t("form.submit")}</SubmitButton>
        <Button className="w-full" variant="outline" href="/blog">
          {t("form.goTo")}
        </Button>
      </form>
    </Form>
  );
};
