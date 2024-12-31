import { timeToInt } from "@/lib/utils";
import { parseISO, startOfDay } from "date-fns";
import { z } from "zod";

/**
 * Pojedynczy obiekt dostępności dla konkretnej daty
 */
export const scheduleDateAvailabilitySchema = z.object({
  date: z.string().min(1, "Wybierz datę"),
  startTime: z
    .string()
    .regex(
      /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      "Czas musi być w formacie HH:MM"
    ),
  endTime: z
    .string()
    .regex(
      /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      "Czas musi być w formacie HH:MM"
    ),
});

/**
 * Cały formularz może zawierać wiele slotów danego dnia
 * plus ewentualne inne pola (np. timezone)
 */
export const scheduleDateFormSchema = z
  .object({
    timezone: z.string().min(1),
    dateAvailabilities: z.array(scheduleDateAvailabilitySchema),
  })
  .superRefine((formData, ctx) => {
    formData.dateAvailabilities.forEach((slot, index) => {
      //1) Walidacja godzin
      if (timeToInt(slot.startTime) >= timeToInt(slot.endTime)) {
        ctx.addIssue({
          code: "custom",
          message: "Czas końcowy musi być późniejszy niż czas poczatkowy!",
          path: ["dateAvailabilities", index, "endTime"],
        });
      }

      // Nie możemy dodawać dostepności w przeszłości
      const slotDate = parseISO(`${slot.date}T00:00:00`);
      const today = startOfDay(new Date());

      if (slotDate < today) {
        ctx.addIssue({
          code: "custom",
          message: "Nie możesz ustawić dostępności w przeszłości!",
          path: ["dateAvailability", index, "date"],
        });
      }
    });
  });
