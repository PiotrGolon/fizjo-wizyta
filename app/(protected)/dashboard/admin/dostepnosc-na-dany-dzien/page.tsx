import { notFound } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { ScheduleDateForm } from "@/components/forms/schedule-date-form";

export const revalidate = 0;

export default async function ScheduleDatesPage() {
  const { userId, redirectToSignIn } = auth();
  const user = await currentUser();
  if (!userId) return redirectToSignIn();

  // Załóżmy, że mamy only-admin logic:
  if (
    !user ||
    (user.emailAddresses[0]?.emailAddress !==
      process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
      process.env.NEXT_PUBLIC_OWNER_EMAIL)
  ) {
    return notFound();
  }

  // Pobieramy schedule z relacją dateAvailabilities
  const schedule = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    with: {
      dateAvailabilities: true,
    },
  });

  // Jeżeli w bazie nie ma schedule dla userId -> undefined
  if (!schedule) {
    return (
      <div className="m-4 text-red-500">
        Brak harmonogramu dla tego użytkownika.
      </div>
    );
  }

  return (
    <div className="m-4">
      <h2 className="text-2xl mb-4">Dostępność dla konkretnych dat</h2>
      <ScheduleDateForm schedule={schedule} />
    </div>
  );
}
