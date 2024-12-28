"use server";

import { z } from "zod";
import { db } from "@/drizzle/db";
import { ScheduleTable, ScheduleDateAvailabilityTable } from "@/drizzle/schema";
import { scheduleDateFormSchema } from "@/schemas/schedule-date";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function saveScheduleDateAvailability(
  unsafeData: z.infer<typeof scheduleDateFormSchema>
) {
  const { userId } = auth();
  if (!userId) return { error: true };

  const parseResult = scheduleDateFormSchema.safeParse(unsafeData);
  if (!parseResult.success) {
    return { error: true, issues: parseResult.error.issues };
  }

  const { timezone, dateAvailabilities } = parseResult.data;

  // 1. Upsert w tabeli ScheduleTable (podobnie jak w saveSchedule)
  const [{ id: scheduleId }] = await db
    .insert(ScheduleTable)
    .values({ clerkUserId: userId, timezone })
    .onConflictDoUpdate({
      target: ScheduleTable.clerkUserId,
      set: { timezone },
    })
    .returning({ id: ScheduleTable.id });

  // 2. Wyczyszczenie istniejących wpisów dot. konkretnych dat (jeśli tak chcesz)
  await db
    .delete(ScheduleDateAvailabilityTable)
    .where(eq(ScheduleDateAvailabilityTable.scheduleId, scheduleId));

  // 3. Wstawienie nowych wpisów
  if (dateAvailabilities?.length > 0) {
    await db.insert(ScheduleDateAvailabilityTable).values(
      dateAvailabilities.map((slot) => ({
        scheduleId,
        date: slot.date, // w formacie YYYY-MM-DD
        startTime: slot.startTime, // "09:00"
        endTime: slot.endTime, // "17:00"
      }))
    );
  }

  return { success: true };
}
