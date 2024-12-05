"use client";

import { useRef, useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { PaperclipIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Tooltip } from "@/components/share/Tooltip";
import { FormItem } from "../ui/Form";
import { toast } from "sonner";
import { AppFormLabel } from "./AppFormLabel";

interface Props {
  readonly selectedFile: File | null;
  // eslint-disable-next-line no-unused-vars
  readonly setSelectedFile: (file: File | null) => void;
  readonly tabIndex?: number;
  readonly validTypes?: string[];
  readonly containerClassName?: string;
  readonly fieldClassName?: string;
  readonly label?: string;
  readonly required?: boolean;
}

/**
 * AppFilePicker component documentation.
 *
 * This module exports the AppFilePicker component, which is a form input field
 * that provides a file picking feature. It uses the `useRef` and `useState` hooks
 * from `react` and the `useTranslations` hook from `next-intl`.
 *
 * The component accepts several props, including `selectedFile`, `setSelectedFile`,
 * `tabIndex`, `validTypes`, `containerClassName`, `fieldClassName`, `label`, and `required`.
 *
 * @see Props
 * @see AppFilePicker
 */

// TODO: refactor this to react-hook-form field with Zod validation
// eg.: https://claritydev.net/blog/react-hook-form-multipart-form-data-file-uploads

export function AppFilePicker({
  selectedFile,
  setSelectedFile,
  tabIndex,
  validTypes = [],
  containerClassName,
  fieldClassName,
  label,
  required,
}: Props) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const t = useTranslations("comps.fileInput");

  const setFile = (file: File | null) => {
    if (file === null || validTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      toast.error(
        <div className="flex flex-col">
          <h3>{t("wrongFileType")}</h3>
          <p>
            {t("validFileTypes", {
              validFileTypes: validTypes
                .map((type) =>
                  type.includes("/") ? type.split("/").pop() : type
                )
                .join(", "),
            })}
          </p>
        </div>
      );
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(file);
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeSelectedFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <FormItem className={containerClassName}>
      <AppFormLabel label={label} required={required} />

      <div
        className={cn(fieldClassName, "w-full rounded-lg border-2", {
          "bg-gray-100": isDraggingOver,
          "cursor-pointer": !selectedFile,
        })}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileInputChange}
          className="hidden"
          ref={fileInputRef}
        />
        <div className="flex size-full items-center justify-center">
          {selectedFile ? (
            <div>
              <div className="flex w-full items-center justify-between gap-5">
                <span className="flex items-center gap-1">
                  <PaperclipIcon size={16} /> {selectedFile.name}
                </span>
                <Tooltip
                  contentProps={{ side: "left" }}
                  content={t("removeFile")}
                >
                  <button
                    type="button"
                    tabIndex={tabIndex}
                    onClick={(e) => {
                      e.preventDefault();
                      removeSelectedFile();
                    }}
                  >
                    <Cross1Icon />
                  </button>
                </Tooltip>
              </div>
            </div>
          ) : (
            <button
              type="button"
              tabIndex={tabIndex}
              onClick={(e) => {
                e.preventDefault();
                openFileInput();
              }}
              className="size-full text-sm text-gray-500"
            >
              {t("dragAndDrop")}
            </button>
          )}
        </div>
      </div>
    </FormItem>
  );
}