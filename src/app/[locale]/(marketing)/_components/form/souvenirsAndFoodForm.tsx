"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "@/i18n/navigation";
import { souvenirsAndFood } from "@/lib/validation/landing";
import CustomFormField, {
  FormFieldType,
} from "@/components/forms/CustomeFormField";
import SubmitButton from "@/components/forms/SubmitButton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/Form";
import Image from "next/image";
import cameraman4Small from "public/assets/images/cameramenFOURSMALL.png";

export const SouvenirsAndFoodForm = () => {
  const t = useTranslations("landingPage.featureDetails.souvenirsAndFood");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof souvenirsAndFood>>({
    resolver: zodResolver(souvenirsAndFood),
    defaultValues: {
      food: "",
      city: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    router.push("/blog/Souvenirs/?blogtype=2&blogid=3");
    try {
      setIsLoading(true);
    } catch (error) {
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
        <div className="-mb-4 flex items-end">
          <div className="w-[40%] rounded-xl lg:hidden">
            <div className="relative flex h-full items-end justify-end">
              <Image
                alt="compass"
                src={cameraman4Small}
                className="h-full object-cover"
              />
            </div>
          </div>
          <div className="w-[55%] lg:w-full">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="food"
              // label={t("form.food.title")}
              placeholder={t("form.food.placeholder")}
              iconAlt="food"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="city"
              // label={t("form.city.title")}
              placeholder={t("form.city.placeholder")}
              iconAlt="city"
            />
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
