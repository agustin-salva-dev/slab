"use client";

import {
  type UseFormReturn,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { DatePicker } from "@/components/ui/DatePicker";
import { Controller } from "react-hook-form";

interface LinkFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  isSubmitting?: boolean;
}

export function LinkForm<T extends FieldValues>({
  form,
  isSubmitting,
}: LinkFormProps<T>) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-1.5">
        <label htmlFor="originalUrl" className="text-sm text-my-secondary">
          Destination URL
        </label>
        <Input
          id="originalUrl"
          {...register("originalUrl" as Path<T>)}
          placeholder="https://example.com/my-long-url"
          disabled={isSubmitting}
          className={errors.originalUrl ? "border-my-accents-red" : ""}
        />
        {errors.originalUrl && (
          <span className="text-sm text-my-accents-red">
            {errors.originalUrl.message as string}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-y-1.5">
        <label htmlFor="shortSlug" className="text-sm text-my-secondary">
          Short link name
        </label>
        <div className="flex relative items-center">
          <span className="absolute left-3 text-sm text-my-secondary">s/</span>
          <Input
            id="shortSlug"
            {...register("shortSlug" as Path<T>)}
            className={`pl-7 pb-0.5 ${errors.shortSlug ? "border-my-accents-red" : ""}`}
            placeholder="my-link"
            disabled={isSubmitting}
          />
        </div>
        {errors.shortSlug && (
          <span className="text-sm text-my-accents-red">
            {errors.shortSlug.message as string}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-y-1.5">
        <label htmlFor="description" className="text-sm text-my-secondary">
          Description
          <span className="text-my-tertiary ml-1">(Optional)</span>
        </label>
        <Textarea
          id="description"
          {...register("description" as Path<T>)}
          placeholder="What is this link for?"
          className={`resize-none ${errors.description ? "border-my-accents-red" : ""}`}
          disabled={isSubmitting}
        />
        {errors.description && (
          <span className="text-sm text-my-accents-red">
            {errors.description.message as string}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-y-1.5">
        <label htmlFor="expires-at" className="text-sm text-my-secondary">
          Expiration date
          <span className="text-my-tertiary ml-1">(Optional)</span>
        </label>
        <Controller
          control={control}
          name={"expiresAt" as Path<T>}
          render={({ field }) => (
            <DatePicker
              id="expires-at"
              date={field.value}
              onSelect={field.onChange}
              placeholder="Select an expiration date"
            />
          )}
        />
        {errors.expiresAt && (
          <span className="text-sm text-my-accents-red">
            {errors.expiresAt?.message as string}
          </span>
        )}
      </div>
    </div>
  );
}
