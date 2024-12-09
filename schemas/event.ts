import { z } from "zod";

export const eventFormSchema = z.object({
  name: z.string().trim().min(1, "Musisz podać nazwę wizyty"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  durationInMinutes: z.coerce
    .number()
    .int()
    .positive("Czas trwania musi być powyżej 0")
    .max(
      60 * 14,
      `Czas trwania nie może być większy niż 14 godzin (${60 * 14} min)`
    ),
});
