import { db } from "@/drizzle/db";
import { getValidTimesFromSchedule } from "@/lib/getValidTimesFromSchedule";
import { clerkClient } from "@clerk/nextjs/server";
import { addDays, eachMinuteOfInterval, endOfDay } from "date-fns";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MeetingForm } from "@/components/forms/meeting-form";

export const revalidate = 0;

export default async function ClerkUserEventPage({
  params: { clerkUserId, eventId },
}: {
  params: { clerkUserId: string; eventId: string };
}) {
  const event = await db.query.EventTable.findFirst({
    where: ({ clerkUserId: userIdCol, isActive, id }, { eq, and }) =>
      and(eq(isActive, true), eq(userIdCol, clerkUserId), eq(id, eventId)),
  });

  if (event == null) return notFound();

  const calendarUser = await clerkClient().users.getUser(clerkUserId);

  const startDate = new Date();
  startDate.setMinutes(0, 0, 0);
  const endDate = endOfDay(addDays(startDate, 6));

  const validTimes = await getValidTimesFromSchedule(
    eachMinuteOfInterval({ start: startDate, end: endDate }, { step: 60 }),
    event
  );

  if (validTimes.length === 0) {
    return <NoTimeSlots event={event} calendarUser={calendarUser} />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-green-700">
            Rezerwujesz - {event.name} u {calendarUser.fullName}
          </CardTitle>
          {event.description && (
            <CardDescription>{event.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <MeetingForm
            validTimes={validTimes}
            eventId={event.id}
            clerkUserId={clerkUserId}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function NoTimeSlots({
  event,
  calendarUser,
}: {
  event: { name: string; description: string | null };
  calendarUser: { id: string; fullName: string | null };
}) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          Zarezerwuj {event.name} u {calendarUser.fullName}
        </CardTitle>
        {event.description && (
          <CardDescription>{event.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {calendarUser.fullName} nie ma obecnie wolnych terminów. Spróbuj
        ponownie później lub wybierz krótsze wydarzenie.
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="bg-green-600 hover:bg-green-500 hover:opacity-95 duration-300"
        >
          <Link href={`/wolne-wizyty/${calendarUser.id}`}>
            Wybierz inną usługę
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
