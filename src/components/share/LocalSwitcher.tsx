import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { ClassValue } from "clsx";
import { Languages } from "lucide-react";

import { useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LocaleSwitcherProps {
  className?: ClassValue;
}

export default function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const t = useTranslations("header.localeSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(value: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: value },
      );
    });
  }

  return (
    <Select
      onValueChange={onSelectChange}
      disabled={isPending}
      defaultValue={locale}
    >
      <SelectTrigger className={cn("gap-2", className)}>
        <Languages size={17} />
        {locale === "en" ? "en" : "فا"}
      </SelectTrigger>
      <SelectContent>
        {locales.map((cur) => (
          <SelectItem key={cur} value={cur}>
            {t(cur)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
