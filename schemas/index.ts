import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Imię i nazwisko jest wymagane!",
    })
    .max(40),
  email: z.string().email({
    message: "Niepoprawnie wpisany adres email!",
  }),
  contactMessage: z
    .string()
    .min(4, {
      message: "Pole nie może być puste!",
    })
    .max(400, {
      message: "Wiadomość może mieć maksymalnie 400 liter",
    }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
