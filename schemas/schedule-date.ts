import { z } from "zod";

/**
 * Pojedynczy obiekt dostępności dla konkretnej daty
 */
export const scheduleDateAvailabilitySchema = z.object({
  date: z.string().min(1, "Wybierz datę"),
  startTime: z.string().min(1, "Podaj godzinę rozpoczęcia"),
  endTime: z.string().min(1, "Podaj godzinę zakończenia"),
});

/**
 * Cały formularz może zawierać wiele slotów danego dnia
 * plus ewentualne inne pola (np. timezone)
 */
export const scheduleDateFormSchema = z.object({
  timezone: z.string().min(1),
  dateAvailabilities: z.array(scheduleDateAvailabilitySchema),
});
