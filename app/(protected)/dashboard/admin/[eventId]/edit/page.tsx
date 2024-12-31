import { EventForm } from "@/components/forms/event-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditEventPage({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  const { userId, redirectToSignIn } = auth();
  const user = await currentUser();

  if (
    !user ||
    user.emailAddresses[0].emailAddress !==
      process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
    process.env.NEXT_PUBLIC_OWNER_EMAIL
  ) {
    return notFound();
  }

  if (userId == null) return redirectToSignIn();

  const event = await db.query.EventTable.findFirst({
    where: ({ id, clerkUserId }, { and, eq }) =>
      and(eq(clerkUserId, userId), eq(id, eventId)),
  });

  if (event == null) return notFound();

  return (
    <Card className="max-w-screen-2xl mt-4 mx-4 bg-gray-100 shadow-lg text-green-600">
      <CardHeader>
        <CardTitle>Edytuj rodzaj wizyty</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm
          event={{ ...event, description: event.description || undefined }}
        />
      </CardContent>
    </Card>
  );
}
