"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/Form";
import CustomFormField, {
  FormFieldType,
} from "@/components/forms/CustomeFormField";
import SubmitButton from "@/components/SubmitButton";
import { useTranslations } from "next-intl";
import { PathFinderSchema } from "@/lib/validation/pathFinder";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
// import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Value } from "react-phone-number-input";
interface FormProps {
  FormData: (DataOrigin: any, DataDestination: any[]) => void;
  SheetOpen: (Value: boolean) => void;
}

export const PathFinderForm: React.FC<FormProps> = ({
  FormData,
  SheetOpen,
}) => {
  const t = useTranslations("PathFinder");
  const [isLoading, setIsLoading] = useState(false);
  const [destinationFields, setDestinationFields] = useState<string[]>([""]);
  const [originValue, setOriginValue] = useState("");
  const [destinationValues, setDestinationValues] = useState<string[]>([""]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [neshanDataOrigin, setNeshanDataOrigin] = useState<any[]>([]);
  const [neshanDataDestinations, setNeshanDataDestinations] = useState<any[][]>(
    [[]]
  );
  const [DataOrigin, setDataOrigin] = useState<any>();
  const [DataDestination, setDataDestination] = useState<any[]>([]);
  const [loadingOrigin, setLoadOrigin] = useState<boolean>(false);
  const [loadingDes, setLoadDes] = useState<boolean[]>([]);
  const searchParams = useSearchParams();
  // const router=useRouter()

  const form = useForm<z.infer<typeof PathFinderSchema>>({
    resolver: zodResolver(PathFinderSchema),
    defaultValues: {
      origin: "",
      destinations: [""],
    },
  });

  const onSubmit = async (values: z.infer<typeof PathFinderSchema>) => {
    setIsLoading(true);
    FormData(DataOrigin, DataDestination);
    // console.log(destinationFields);
    // console.log(DataDestination);
    SheetOpen(false);
    setIsLoading(false);
  };

  useEffect(() => {
    const originValueParam = (searchParams.get("origin") || "").replace(
      /\/$/,
      ""
    );
    const destinationValueParam = (searchParams.get("des") || "").replace(
      /\/$/,
      ""
    );
    if (originValueParam) {
      const parsedOrigin = JSON.parse(decodeURIComponent(originValueParam));
      const parsedDestination = JSON.parse(
        decodeURIComponent(destinationValueParam)
      );
      setDataOrigin(parsedOrigin);
      setDataDestination((prev) => [parsedDestination]);
      form.setValue("origin", parsedOrigin.title);
      form.setValue(`destinations.${0}`, parsedDestination.title);
    }
  }, [searchParams, form]);

  useEffect(() => {
    if (DataDestination && DataOrigin) {
      FormData(DataOrigin, DataDestination);
    }
  }, [DataOrigin, DataDestination, FormData]);

  const addDestinationField = () => {
    if (destinationFields.length < 3) {
      setDestinationFields((prev) => [...prev, ""]);
      form.setValue("destinations", [...form.getValues("destinations"), ""]);
      setNeshanDataDestinations((prev) => [...prev, []]);
    }
  };

  const changeHandler = async (
    e: any,
    type: "origin" | "destination",
    index?: number
  ) => {
    const newValue = e;
    if (type === "origin") {
      setNeshanDataOrigin([]);
      setLoadOrigin(true);
    } else if (type === "destination" && index !== undefined) {
      setNeshanDataDestinations((prev) => {
        const updatedData = [...prev];
        updatedData[index] = [];
        return updatedData;
      });
      setLoadDes((prev) => {
        const updatedLoading = [...prev];
        updatedLoading[index] = true;
        return updatedLoading;
      });
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://api.neshan.org/v1/search?term=${newValue}&lat=36.6875447&lng=51.3054564`,
          {
            headers: { "api-key": process.env.NEXT_PUBLIC_NESHAN_KEY },
          }
        );

        const data = response.data.items;
        if (type === "origin") {
          setOriginValue(newValue);
          setNeshanDataOrigin(data.slice(0, 5));
        } else if (type === "destination" && index !== undefined) {
          setDestinationValues((prev) => {
            const updatedValues = [...prev];
            updatedValues[index] = newValue;
            return updatedValues;
          });
          setNeshanDataDestinations((prev) => {
            const updatedData = [...prev];
            updatedData[index] = data.slice(0, 5);
            return updatedData;
          });
        }

        setIsLoading(false);
        setLoadOrigin(false);
        if (type === "destination" && index !== undefined) {
          setLoadDes((prev) => {
            const updatedLoading = [...prev];
            updatedLoading[index] = false;
            return updatedLoading;
          });
        }
      } catch (error) {
        console.error("Form submission failed:", error);
        setIsLoading(false);
        if (type === "destination" && index !== undefined) {
          setLoadDes((prev) => {
            const updatedLoading = [...prev];
            updatedLoading[index] = false;
            return updatedLoading;
          });
        }
      }
    }, 1000);
  };

  const handleItemClick = (
    item: any,
    type: "origin" | "destination",
    index?: number
  ) => {
    setLoadOrigin(false);
    if (type === "origin") {
      setOriginValue("");
      // console.log(item);
      setDataOrigin(item);
      setNeshanDataOrigin([]);
      form.setValue("origin", item.title);
    } else if (type === "destination" && index !== undefined) {
      setDestinationValues([""]);
      setNeshanDataDestinations((prev) => {
        const updatedData = [...prev];
        updatedData[index] = [];
        return updatedData;
      });
      if (destinationFields.length === 1) {
        setDataDestination((prev) => [item]);
      } else {
        setDataDestination((prev) => {
          const updatedDestinations = [...prev];
          updatedDestinations[index] = item;
          return updatedDestinations;
        });
      }
      form.setValue(`destinations.${index}`, item.title);
    }
  };

  const removeDestinationField = (index: number) => {
    setDestinationFields((prev) => prev.filter((_, i) => i !== index));
    form.setValue(
      "destinations",
      form.getValues("destinations").filter((_, i) => i !== index)
    );
    setNeshanDataDestinations((prev) => prev.filter((_, i) => i !== index));

    setDataDestination((prev) => prev.filter((_, i) => i !== index));
    // console.log(DataDestination);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="origin"
          label={t("origin.title")}
          placeholder={t("origin.placeHolder")}
          onChange={(e) => changeHandler(e, "origin")}
        />
        {originValue && (
          <div className="flex h-1/2 flex-col flex-wrap text-center">
            <ul>
              {neshanDataOrigin.map((item, key) => (
                <li
                  key={key}
                  className="m-2 h-9 w-64 cursor-pointer rounded-md bg-gray-300"
                  onClick={() => handleItemClick(item, "origin")}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
        {loadingOrigin ? (
          <div className="flex h-1/2 flex-col flex-wrap">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="m-2 h-9 w-64 bg-gray-300" />
            ))}
          </div>
        ) : (
          <div></div>
        )}
        {destinationFields.map((_, index) => (
          <div key={index} className="relative">
            <CustomFormField
              key={`destination-${index}`}
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name={`destinations.${index}`}
              label={`${t("destination.title")} ${index + 1}`}
              placeholder={t("destination.placeHolder")}
              onChange={(e) => changeHandler(e, "destination", index)}
            />
            {destinationValues[index] && (
              <div className="flex h-1/2 flex-col flex-wrap text-center">
                <ul>
                  {neshanDataDestinations[index].map((item, key) => (
                    <li
                      key={key}
                      className="m-2 h-9 w-64 cursor-pointer rounded-md bg-gray-300"
                      onClick={() =>
                        handleItemClick(item, "destination", index)
                      }
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {loadingDes[index] ? (
              <div className="flex h-1/2 flex-col flex-wrap">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="m-2 h-9 w-64 bg-gray-300" />
                ))}
              </div>
            ) : null}
            {index > 0 && (
              <Button
                variant="outline"
                className="absolute left-0 top-2"
                onClick={() => {
                  removeDestinationField(index);
                }}
              >
                <X />
              </Button>
            )}
          </div>
        ))}
        <div className="mb-4">
          <Button type="button" onClick={addDestinationField}>
            {t("addDestination")}
          </Button>
        </div>
        <SubmitButton isLoading={isLoading}>{t("submit")}</SubmitButton>
      </form>
    </Form>
  );
};
