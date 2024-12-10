import { EventForm } from "@/components/forms/event-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditEventPage({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  const { userId, redirectToSignIn } = auth();
  if (userId == null) return redirectToSignIn();

  const event = await db.query.EventTable.findFirst({
    where: ({ id, clerkUserId }, { and, eq }) =>
      and(eq(clerkUserId, userId), eq(id, eventId)),
  });

  if (event == null) return notFound();

  return (
    <Card className="lg:max-w-4xl md:max-w-3xl max-w-md mx-auto mt-4 bg-gray-100 shadow-lg text-green-600">
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
