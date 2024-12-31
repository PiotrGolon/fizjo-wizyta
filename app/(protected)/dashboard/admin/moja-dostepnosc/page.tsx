import { ScheduleForm } from "@/components/forms/schedule-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function SchedulePage() {
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

  const schedule = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    with: { availabilities: true },
  });

  return (
    <Card className="max-w-screen-2xl mt-4 mx-4 bg-gray-100 shadow-lg text-green-600">
      <CardHeader>
        <CardTitle className="text-2xl">Dodaj dostępność</CardTitle>
      </CardHeader>
      <CardContent>
        <ScheduleForm schedule={schedule} />
      </CardContent>
    </Card>
  );
}
