"use server";
import { db } from "@/drizzle/db";
import { getValidTimesFromSchedule } from "@/lib/getValidTimesFromSchedule";
import { meetingActionSchema } from "@/schemas/meetings";
import { redirect } from "next/navigation";
import "use-server";
import { z } from "zod";
import { createCalendarEvent } from "../googleCalendar";
import { fromZonedTime } from "date-fns-tz";

export async function createMeeting(
  unsafeData: z.infer<typeof meetingActionSchema>
): Promise<{ error: boolean } | undefined> {
  const { success, data } = meetingActionSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true };
  }

  const event = await db.query.EventTable.findFirst({
    where: ({ clerkUserId, isActive, id }, { eq, and }) =>
      and(
        eq(isActive, true),
        eq(clerkUserId, data.clerkUserId),
        eq(id, data.eventId)
      ),
  });

  if (event == null) return { error: true };
  const startInTimezone = fromZonedTime(data.startTime, data.timezone);

  const validTImes = await getValidTimesFromSchedule([startInTimezone], event);
  if (validTImes.length == 0) return { error: true };

  await createCalendarEvent({
    ...data,
    startTime: startInTimezone,
    durationInMinutes: event.durationInMinutes,
    eventName: event.name,
  });

  redirect(
    `/wolne-wizyty/user_2n1u8b2jrjY5iSaD2FPsGK7cdd3/${
      data.eventId
    }/success?startTime=${data.startTime.toISOString()}`
  );
}
