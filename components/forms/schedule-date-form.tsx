"use client";

import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { scheduleDateFormSchema } from "@/schemas/schedule-date";
import { saveScheduleDateAvailability } from "@/server/actions/schedule-date";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { X, Plus } from "lucide-react";

/**
 * Definiujemy typy formularza
 */
type ScheduleDateFormValues = z.infer<typeof scheduleDateFormSchema>;

/**
 * Komponent formularza dla konkretnej daty
 */
export function ScheduleDateForm({
  schedule, // tu możesz wstawić pobrane z bazy dateAvailabilities itd.
}: {
  schedule?: {
    timezone: string;
    dateAvailabilities: {
      date: string;
      startTime: string;
      endTime: string;
    }[];
  };
}) {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string>();

  const form = useForm<ScheduleDateFormValues>({
    resolver: zodResolver(scheduleDateFormSchema),
    defaultValues: {
      timezone:
        schedule?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      dateAvailabilities: schedule?.dateAvailabilities ?? [],
    },
  });

  const {
    fields,
    append: addDateSlot,
    remove: removeDateSlot,
  } = useFieldArray({
    name: "dateAvailabilities",
    control: form.control,
  });

  async function onSubmit(values: ScheduleDateFormValues) {
    const result = await saveScheduleDateAvailability(values);

    if (result?.error) {
      form.setError("root", {
        message:
          "Wystąpił błąd podczas zapisywania harmonogramu dla konkretnej daty",
      });
    } else {
      setSuccessMessage("Dostępność dla konkretnego dnia zapisana!");
      setTimeout(() => router.push("/dashboard/admin"), 2000);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {/* Globalny komunikat o błędzie lub sukcesie */}
        {form.formState.errors.root && (
          <div className="text-red-500 text-sm">
            {form.formState.errors.root.message}
          </div>
        )}
        {successMessage && (
          <div className="text-green-500 text-sm">{successMessage}</div>
        )}

        {/* Pole "timezone" */}
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pola do definiowania dat i przedziałów czasowych */}
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-center">
            {/* Data */}
            <FormField
              control={form.control}
              name={`dateAvailabilities.${index}.date`}
              render={({ field }) => (
                <FormItem className="w-[160px]">
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Start time */}
            <FormField
              control={form.control}
              name={`dateAvailabilities.${index}.startTime`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* End time */}
            <FormField
              control={form.control}
              name={`dateAvailabilities.${index}.endTime`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Koniec</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="destructiveGhost"
              type="button"
              onClick={() => removeDateSlot(index)}
              className="self-end mb-1"
            >
              <X size={16} />
            </Button>
          </div>
        ))}

        <Button
          variant="outline"
          type="button"
          onClick={() => addDateSlot({ date: "", startTime: "", endTime: "" })}
        >
          <Plus size={16} className="mr-1" />
          Dodaj kolejną datę
        </Button>

        {/* Przycisk Zapisz */}
        <div className="flex justify-end">
          <Button
            className="bg-green-600 hover:bg-green-500"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            Zapisz
          </Button>
        </div>
      </form>
    </Form>
  );
}
