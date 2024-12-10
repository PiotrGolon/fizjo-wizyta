import { ScheduleForm } from "@/components/forms/schedule-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { auth } from "@clerk/nextjs/server";

export const revalidate = 0;

export default async function SchedulePage() {
  const { userId, redirectToSignIn } = auth();
  if (userId == null) return redirectToSignIn();

  const schedule = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    with: { availabilities: true },
  });

  return (
    <Card className="lg:max-w-4xl md:max-w-3xl max-w-md mx-auto mt-4 bg-gray-100 shadow-lg text-green-600">
      <CardHeader>
        <CardTitle className="text-2xl">Dodaj dostępność</CardTitle>
      </CardHeader>
      <CardContent>
        <ScheduleForm schedule={schedule} />
      </CardContent>
    </Card>
  );
}
