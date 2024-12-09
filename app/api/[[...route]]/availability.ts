// import { Hono } from "hono";
// import { db } from "@/db/drizzle";
// // import { availabilityDates, availabilitySlots } from "@/db/schema";
// import { zValidator } from "@hono/zod-validator";
// import { z } from "zod";
// import { and, eq } from "drizzle-orm";
// // import { createId } from "@paralleldrive/cuid2";

// // import { google } from "googleapis";

// // Importy zewnętrznych narzędzi
// import { parse } from "date-fns";

// const app = new Hono()
//   .get(
//     "/",
//     zValidator(
//       "query",
//       z.object({
//         date: z.string().optional(),
//         adminId: z.string().optional(),
//       })
//     ),
//     async (c) => {
//       const { date, adminId } = c.req.valid("query");

//       const selectedDate = date
//         ? parse(date, "yyyy-MM-dd", new Date())
//         : new Date();

//       // Pierwsze zapytanie do pobrania dat
//       const dates = await db
//         .select({
//           id: availabilityDates.id,
//           date: availabilityDates.date,
//         })
//         .from(availabilityDates)
//         .where(
//           and(
//             eq(availabilityDates.date, selectedDate),
//             adminId ? eq(availabilityDates.userId, adminId) : undefined
//           )
//         )
//         .orderBy(availabilityDates.date);

//       if (dates.length === 0) {
//         return c.json({ availability: [] });
//       }

//       // Pobranie identyfikatorów dat do dalszego użycia
//       const dateIds = dates.map((date) => date.id);

//       // Drugie zapytanie do pobrania slotów związanych z datami
//       const slots = await db
//         .select({
//           slot_id: availabilitySlots.id,
//           start_time: availabilitySlots.startTime,
//           end_time: availabilitySlots.endTime,
//           available: availabilitySlots.available,
//           admin_email: availabilitySlots.adminEmail,
//           google_event_id: availabilitySlots.googleEventId,
//           dateId: availabilitySlots.dateId,
//         })
//         .from(availabilitySlots)
//         .where(and(eq(availabilitySlots.dateId, dateIds[0])))
//         .orderBy(availabilitySlots.startTime);

//       // Łączenie wyników dat z odpowiednimi slotami
//       const data = dates.map((date) => ({
//         date: date.date,
//         slots: slots.filter((slot) => slot.dateId === date.id),
//       }));

//       return c.json({ availability: data });
//     }
//   )
//   .get(
//     "/:id",
//     zValidator(
//       "param",
//       z.object({
//         id: z.string(),
//       })
//     ),
//     async (c) => {
//       const { id } = c.req.valid("param");

//       if (!id) {
//         return c.json({ error: "Missing id" }, 400);
//       }

//       const [data] = await db
//         .select({
//           id: availabilitySlots.id,
//           date: availabilityDates.date,
//           startTime: availabilitySlots.startTime,
//           endTime: availabilitySlots.endTime,
//           available: availabilitySlots.available,
//           adminEmail: availabilitySlots.adminEmail,
//           googleEventId: availabilitySlots.googleEventId,
//         })
//         .from(availabilitySlots)
//         .leftJoin(
//           availabilityDates,
//           eq(availabilitySlots.dateId, availabilityDates.id)
//         )
//         .where(eq(availabilitySlots.id, id))
//         .limit(1);

//       if (!data) {
//         return c.json({ error: "Not found" }, 404);
//       }

//       return c.json({ data });
//     }
//   );
// // .post(
// //   "/",
// //   zValidator(
// //     "json",
// //     z.object({
// //       date: z.coerce.date(),
// //       slots: z.array(
// //         z.object({
// //           startTime: z.string(),
// //           endTime: z.string(),
// //         })
// //       ),
// //     })
// //   ),
// //   async (c) => {
// //     const { date, slots } = c.req.valid("json");
// //     const userId = "loggedInAdminUserId"; // Pobierz ID admina zalogowanego za pomocą Clerk
// //     const googleAccessToken = "loggedInAdminGoogleAccessToken"; // Pobierz token dostępu do Google Calendar

// //     // Dodanie dostępności do bazy danych
// //     const dateId = createId();
// //     await db.insert(availabilityDates).values({ id: dateId, date, userId });

// //     for (const slot of slots) {
// //       const slotId = createId();
// //       await db.insert(availabilitySlots).values({
// //         id: slotId,
// //         dateId,
// //         startTime: slot.startTime,
// //         endTime: slot.endTime,
// //         adminEmail: users.email,
// //       });

// //       // Dodanie dostępności do Google Calendar
// //       const oauth2Client = new google.auth.OAuth2();
// //       oauth2Client.setCredentials({ access_token: googleAccessToken });
// //       const calendar = google.calendar({ version: "v3", auth: oauth2Client });

// //       await calendar.events.insert({
// //         calendarId: "primary",
// //         requestBody: {
// //           summary: "Wolna Dostępność - wizyta fizjoterapeutyczna",
// //           start: { dateTime: `${date}T${slot.startTime}:00` },
// //           end: { dateTime: `${date}T${slot.endTime}:00` },
// //         },
// //       });
// //     }

// //     return c.json({ message: "Availability slots added successfully" });
// //   }
// // )
// // .patch(
// //   "/:id",
// //   zValidator(
// //     "param",
// //     z.object({
// //       id: z.string(),
// //     })
// //   ),
// //   zValidator(
// //     "json",
// //     z.object({
// //       available: z.boolean(),
// //     })
// //   ),
// //   async (c) => {
// //     const { id } = c.req.valid("param");
// //     const { available } = c.req.valid("json");

// //     await db
// //       .update(availabilitySlots)
// //       .set({ available })
// //       .where(eq(availabilitySlots.id, id));

// //     return c.json({ message: "Availability slot updated successfully" });
// //   }
// // )
// // .delete("/expired", async (c) => {
// //   const now = new Date();

// //   await db
// //     .delete(availabilitySlots)
// //     .where(lte(availabilitySlots.endTime, now));

// //   return c.json({
// //     message: "Expired availability slots removed successfully",
// //   });
// // });

// export default app;
