import { useMemo, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./command";
import { Label } from "./Label";
import { Popover, PopoverAnchor, PopoverContent } from "./popover";
import { Skeleton } from "./skeleton";

type Props<T extends string> = {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: string[];
  isLoading?: boolean;
  emptyMessage?: string;
  placeholder?: string;
  onChangeHandler?: (value: any) => void;
  itemClickHandler?: (Value: any) => void;
  label?: string;
};

export function AutoComplete<T extends string>({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage = "",
  placeholder = "Search...",
  onChangeHandler,
  itemClickHandler,
  label,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("PathFinder");
  const labels = useMemo(() => {
    if (!items) return {};
    return items.reduce(
      (acc, item) => {
        acc[item] = item;
        return acc;
      },
      {} as Record<string, string>
    );
  }, [items]);

  const reset = () => {
    onSelectedValueChange("" as T);
    onSearchValueChange("");
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {};

  const onSelectItem = (inputValue: string) => {
    if (inputValue === selectedValue) {
      reset();
    } else {
      onSelectedValueChange(inputValue as T);
      onSearchValueChange(labels[inputValue] ?? "");
    }
    setOpen(false);
  };

  return (
    <div className="flex items-baseline justify-center space-x-2">
      {label && <Label className="shrink-0">{label}</Label>}
      <div className="flex-1">
        <Popover open={open} onOpenChange={setOpen}>
          <Command shouldFilter={false}>
            <PopoverAnchor asChild>
              <CommandPrimitive.Input
                asChild
                value={searchValue}
                onValueChange={onSearchValueChange}
                onKeyDown={(e) => setOpen(e.key !== "Escape")}
                onMouseDown={() => setOpen((open) => !!searchValue || !open)}
                onFocus={() => setOpen(true)}
                onBlur={onInputBlur}
              >
                <Input
                  placeholder={placeholder}
                  onChange={(e) => {
                    if (onChangeHandler) {
                      onChangeHandler(e.target.value);
                    }
                  }}
                />
              </CommandPrimitive.Input>
            </PopoverAnchor>
            {!open && <CommandList aria-hidden="true" className="hidden" />}
            <PopoverContent
              asChild
              onOpenAutoFocus={(e) => e.preventDefault()}
              onInteractOutside={(e) => {
                if (
                  e.target instanceof Element &&
                  e.target.hasAttribute("cmdk-input")
                ) {
                  e.preventDefault();
                }
              }}
              className="w-[--radix-popover-trigger-width] p-0"
            >
              <CommandList>
                {isLoading && (
                  <CommandPrimitive.Loading>
                    <div className="p-1">
                      <Skeleton className="h-6 w-full" />
                    </div>
                  </CommandPrimitive.Loading>
                )}
                {items?.length > 0 && !isLoading ? (
                  <CommandGroup>
                    {items.map((option, index) => (
                      <CommandItem
                        key={index}
                        value={option}
                        onMouseDown={(e) => e.preventDefault()}
                        onSelect={() => {
                          if (itemClickHandler) {
                            itemClickHandler(option);
                          }
                          onSelectItem(option);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedValue === option
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {option}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : null}
                {!isLoading ? (
                  <CommandEmpty>{emptyMessage ?? ""}</CommandEmpty>
                ) : null}
              </CommandList>
            </PopoverContent>
          </Command>
        </Popover>
      </div>
    </div>
  );
}
export default AutoComplete;
