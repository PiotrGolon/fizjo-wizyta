"use server";
import "use-server";

import { eventFormSchema } from "@/schemas/event";
import { EventTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";

export async function createEvent(
  unsafeData: z.infer<typeof eventFormSchema>
): Promise<{ error: boolean } | undefined> {
  const { userId } = auth();
  const { success, data } = eventFormSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return { error: true };
  }

  await db.insert(EventTable).values({ ...data, clerkUserId: userId });

  redirect("/dashboard/admin");
}
