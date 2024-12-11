import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { formatDateTime } from "@/lib/formatters";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function SuccessPage({
  params: { clerkUserId, eventId },
  searchParams: { startTime },
}: {
  params: { clerkUserId: string; eventId: string };
  searchParams: { startTime: string };
}) {
  const event = await db.query.EventTable.findFirst({
    where: ({ clerkUserId: userIdCol, isActive, id }, { eq, and }) =>
      and(eq(isActive, true), eq(userIdCol, clerkUserId), eq(id, eventId)),
  });

  if (event == null) notFound();

  const calendarUser = await clerkClient().users.getUser(clerkUserId);
  const startTimeDate = new Date(startTime);

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>
          Zarezerwowałeś {event.name} u {calendarUser.fullName}
        </CardTitle>
        <CardDescription>
          <div className="flex flex-col">
            <p>Data i godzina wizyty: {formatDateTime(startTimeDate)}</p>
            <p>Miejsce: Andrzeja 3, 05-800 Pruszków</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        Wkrótce powinieneś otrzymać potwierdzenie na email, który podałeś w
        formularzu.{" "}
        <span className="underline">
          Proszę o zaznaczenie obecności w tym mailu, poprzez kliknięcie
          &quot;Tak&quot;.
        </span>{" "}
        Możesz bezpiecznie opuścić tę stronę.
      </CardContent>
      <CardFooter>
        <Button
          className="bg-green-600 hover:bg-green-500 hover:opacity-95 duration-300"
          asChild
        >
          <Link href="/">Wróć na stronę główną</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
