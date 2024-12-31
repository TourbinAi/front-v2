"use client"

import { BaseSyntheticEvent } from "react"
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  UseFormReturn,
} from "react-hook-form"

import { removeThisWhenYouNeedMe } from "@/lib/general-helpers"

/**
 * AppForm component documentation.
 *
 * This module exports the AppForm component, which is a wrapper for form functionality
 * that provides integration with react-hook-form. It handles form submission,
 * validation, and error handling.
 *
 * The component serves as a provider for form context and manages form state
 * for all child form components.
 *
 * @see Props
 * @see AppForm
 */

/**
 * Props for the AppForm component.
 *
 * @typedef {Object} Props
 * @property {UseFormReturn<T>} form - The form instance from react-hook-form
 * @property {Function} onSubmit - Handler function called on form submission
 * @property {Function} [onError] - Handler function called on form validation errors
 * @property {React.ReactNode} children - Child components within the form
 * @property {string} [className] - Class name for the form element
 * @property {string} [id] - ID attribute for the form element
 * @property {boolean} [disabled] - Whether the entire form is disabled
 */

interface Props<T extends FieldValues = FieldValues> {
  readonly form: UseFormReturn<T>
  readonly onSubmit: (
    // eslint-disable-next-line no-unused-vars
    values: T,
    // eslint-disable-next-line no-unused-vars
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => void
  readonly onError?: SubmitErrorHandler<T>
  readonly children: React.ReactNode
  readonly className?: string
  readonly id?: string
  readonly disabled?: boolean
}

export function AppForm<T extends FieldValues = FieldValues>({
  onSubmit,
  onError = () => {},
  children,
  className,
  id,
  form,
  disabled,
}: Props<T>) {
  removeThisWhenYouNeedMe("AppForm")

  const { handleSubmit } = form

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={className}
        id={id}
        noValidate
      >
        <fieldset disabled={disabled} className="space-y-4 ">
          {children}
        </fieldset>
      </form>
    </FormProvider>
  )
}
