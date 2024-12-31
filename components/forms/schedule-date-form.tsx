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
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { formatTimezoneOffset } from "@/lib/formatters";
import { DatePicker } from "../date-picker";

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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Intl.supportedValuesOf("timeZone").map((timezone) => (
                    <SelectItem key={timezone} value={timezone}>
                      {timezone}
                      {` (${formatTimezoneOffset(timezone)})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Pola do definiowania dat i przedziałów czasowych */}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col md:flex-row gap-x-4 items-center"
          >
            {/* Data */}
            <FormField
              control={form.control}
              name={`dateAvailabilities.${index}.date`}
              render={({ field }) => (
                <FormItem className="flex flex-col w-full md:w-auto justify-between">
                  <FormLabel className="text-green-600 py-1 mt-1">
                    Data
                  </FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
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
                <FormItem className="w-full md:w-auto">
                  <FormLabel className="text-green-500">Start</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full md:w-24"
                      aria-label={`Start Time`}
                      {...field}
                    />
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
                <FormItem className="w-full md:w-auto">
                  <FormLabel className="text-green-500">Koniec</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full md:w-24"
                      aria-label={`Start Time`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="destructive"
              type="button"
              onClick={() => removeDateSlot(index)}
              className="self-end mt-2 w-full md:w-auto"
            >
              Usuń
            </Button>
          </div>
        ))}

        <Button
          variant="outline"
          type="button"
          onClick={() =>
            addDateSlot({ date: "", startTime: "9:00", endTime: "17:00" })
          }
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
