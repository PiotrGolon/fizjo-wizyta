import PhysioDecription from "@/components/physio-description";
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
import { formatEventDescription } from "@/lib/formatters";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function BookingPage({
  params: { clerkUserId },
}: {
  params: { clerkUserId: string };
}) {
  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId: userIdCol, isActive }, { eq, and }) =>
      and(eq(userIdCol, clerkUserId), eq(isActive, true)),
    orderBy: ({ name }, { asc, sql }) => asc(sql`lower(${name})`),
  });

  if (events.length === 0) return notFound();

  return (
    <div className="mx-auto max-w-screen-2xl">
      <PhysioDecription />

      <div className="text-muted-foreground mb-6 max-w-sm mx-auto mt-4 text-center">
        Nie czekaj w kolejkach! Skorzystaj z naszego harmonogramu online i umów
        wizytę w dogodnym dla Ciebie czasie.
      </div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}

type EventCardProps = {
  id: string;
  name: string;
  clerkUserId: string;
  description: string | null;
  durationInMinutes: number;
};

function EventCard({
  id,
  name,
  description,
  clerkUserId,
  durationInMinutes,
}: EventCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {formatEventDescription(durationInMinutes)}
        </CardDescription>
      </CardHeader>
      {description != null && <CardContent>{description}</CardContent>}
      <CardFooter className="flex justify-end gap-2 mt-auto">
        <Button
          className="bg-green-600 hover:bg-green-500 hover:opacity-95 duration-300"
          asChild
        >
          <Link href={`/wolne-wizyty/${clerkUserId}/${id}`}>Wybierz</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
