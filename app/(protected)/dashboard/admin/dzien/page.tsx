import { notFound } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { ScheduleTable, ScheduleDateAvailabilityTable } from "@/drizzle/schema";
import { ScheduleDateForm } from "@/components/forms/schedule-date-form";

export const revalidate = 0;

export default async function ScheduleDatesPage() {
  const { userId, redirectToSignIn } = auth();
  const user = await currentUser();
  if (!userId) return redirectToSignIn();

  // Załóżmy, że mamy only-admin logic:
  if (
    !user ||
    user.emailAddresses[0]?.emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
  ) {
    return notFound();
  }

  // Szukamy w bazie schedule i powiązanych dateAvailabilities:
  const [scheduleWithDates] = await db
    .select({
      id: ScheduleTable.id,
      timezone: ScheduleTable.timezone,
      dateAvailabilities: ScheduleDateAvailabilityTable, // lub alias + leftJoin
    })
    .from(ScheduleTable)
    .leftJoin(
      ScheduleDateAvailabilityTable,
      eq(ScheduleTable.id, ScheduleDateAvailabilityTable.scheduleId)
    )
    .where(eq(ScheduleTable.clerkUserId, userId));

  // Musimy poskładać dateAvailabilities w tablicę (ponieważ leftJoin zwraca wiersze):
  const schedule = scheduleWithDates
    ? {
        timezone: scheduleWithDates.timezone,
        dateAvailabilities: scheduleWithDates.dateAvailabilities
          ? Array.isArray(scheduleWithDates.dateAvailabilities)
            ? scheduleWithDates.dateAvailabilities
            : [scheduleWithDates.dateAvailabilities]
          : [],
      }
    : undefined;

  return (
    <div className="m-4">
      <h2 className="text-2xl mb-4">Dostępność dla konkretnych dat</h2>
      <ScheduleDateForm schedule={schedule} />
    </div>
  );
}
