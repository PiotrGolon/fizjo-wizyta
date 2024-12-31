import { startOfDay } from "date-fns";
import { z } from "zod";

export const meetingSchemaBase = z.object({
  startTime: z
    .date()
    .min(
      new Date(),
      "Godzina musi być w przyszłości, nie można zapisać się wstecz!"
    ),
  guestEmail: z.string().email().min(1, "Wymagany"),
  guestName: z.string().min(1, "Wymagany"),
  guestNotes: z.string().optional(),
  timezone: z.string().min(1, "Wymagany"),
});

export const meetingFormSchema = z
  .object({
    date: z
      .date()
      .min(
        startOfDay(new Date()),
        "Godzina musi być w przyszłości, nie można zapisać się wstecz!"
      ),
  })
  .merge(meetingSchemaBase);

export const meetingActionSchema = z
  .object({
    eventId: z.string().min(1, "Wymagane"),
    clerkUserId: z.string().min(1, "Wymagane"),
  })
  .merge(meetingSchemaBase);
