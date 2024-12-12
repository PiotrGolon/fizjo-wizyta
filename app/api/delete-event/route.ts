import { NextResponse } from "next/server";
import { deleteEvent } from "@/server/googleCalendar";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const eventId = url.searchParams.get("id");

  if (!eventId) {
    return NextResponse.json(
      { error: "No event id provided" },
      { status: 400 }
    );
  }

  try {
    await deleteEvent(userId, eventId);
    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
