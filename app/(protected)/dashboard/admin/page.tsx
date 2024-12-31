import { CopyEventButton } from "@/components/protected/copy-event-button";
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
import { cn } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { CalendarPlus2Icon, CalendarRange } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AdminDashboardPage() {
  const { userId, redirectToSignIn } = auth();
  const user = await currentUser();

  if (
    !user ||
    (user.emailAddresses[0].emailAddress !==
      process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
      process.env.NEXT_PUBLIC_OWNER_EMAIL)
  ) {
    return notFound();
  }

  if (userId == null) {
    redirectToSignIn();
  }

  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId!),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });

  return (
    <>
      <div>
        <h1 className="flex justify-center text-green-600 mt-4 text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6">
          Panel Admina
        </h1>
        <div className="flex justify-between items-center mx-2">
          <h2 className="text-lg text-green-600 font-semibold">
            Dodaj nowy rodzaj wizyty
          </h2>
          <Button
            className="bg-green-600 hover:bg-green-500 hover:opacity-95 duration-300"
            asChild
          >
            <Link href="/dashboard/admin/nowa-wizyta">
              <CalendarPlus2Icon className="mr-2 size-6" />
              Nowy rodzaj wizyty
            </Link>
          </Button>
        </div>
      </div>
      {events.length > 0 ? (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <CalendarRange className="size-16 mx-auto text-green-600" />
          <span className="mx-10 text-center text-green-700">
            {" "}
            Nie masz jeszcze stworzonego rodzaju wizyty, na które mogliby się
            zapisywać twoi klienci. Kliknij w przycisk &quot;Nowy rodzaj
            wizyty&quot;, aby móc wykorzystać panel!
          </span>
          <Button
            size="lg"
            className="text-lg bg-green-600 hover:bg-green-500 hover:opacity-95 duration-300"
            asChild
          >
            <Link href="/dashboard/admin/nowa-wizyta">
              <CalendarPlus2Icon className="mr-2 size-6" />
              Nowy rodzaj wizyty
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}

type EventCardProps = {
  id: string;
  isActive: boolean;
  name: string;
  description: string | null;
  durationInMinutes: number;
  clerkUserId: string;
};

function EventCard({
  id,
  isActive,
  name,
  description,
  durationInMinutes,
  clerkUserId,
}: EventCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col mx-2 bg-gray-100 mt-4 text-green-600",
        !isActive && "border-secondary/50"
      )}
    >
      <CardHeader className={cn(!isActive && "opacity-50")}>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {formatEventDescription(durationInMinutes)}
        </CardDescription>
      </CardHeader>
      {description != null && (
        <CardContent className={cn(!isActive && "opacity-50")}>
          {description}
        </CardContent>
      )}
      <CardFooter className="flex justify-end gap-2 mt-auto">
        {isActive && (
          <CopyEventButton
            variant="outline"
            eventId={id}
            clerkUserId={clerkUserId}
          />
        )}
        <Button
          asChild
          className="bg-green-600 hover:bg-green-500 hover:opacity-95"
        >
          <Link href={`/dashboard/admin/${id}/edit`}>Edytuj</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
