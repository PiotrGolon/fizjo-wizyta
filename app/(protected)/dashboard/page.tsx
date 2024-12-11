import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { MeetingsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const revalidate = 0;

function formatMeetingDate(date: Date) {
  const day = date.getDate();
  const months = [
    "sty",
    "lut",
    "mar",
    "kwi",
    "maj",
    "cze",
    "lip",
    "sie",
    "wrz",
    "paź",
    "lis",
    "gru",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year} g. ${hour}.${minutes}`;
}

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return <div>Brak zalogowanego użytkownika</div>;
  }

  const userEmail = user.emailAddresses[0].emailAddress;
  const meetings = await db
    .select()
    .from(MeetingsTable)
    .where(eq(MeetingsTable.guestEmail, userEmail));

  const now = new Date();
  const upcomingMeetings = meetings.filter((m) => m.startTime > now);
  const pastMeetings = meetings.filter((m) => m.startTime <= now);

  return (
    <div className="mt-4 ml-4 space-y-8">
      <h3 className="text-2xl font-semibold text-green-600 text-center">
        Witaj, {user.firstName ?? userEmail}
      </h3>

      {/* NADCHODZĄCE WIZYTY */}
      <div>
        <h4 className="text-xl font-bold mb-4">NADCHODZĄCE WIZYTY</h4>
        {upcomingMeetings.length === 0 ? (
          <p>Brak nadchodzących spotkań.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingMeetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader>
                  <CardTitle>{meeting.guestName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Data:</strong>{" "}
                    {formatMeetingDate(meeting.startTime)}
                  </p>
                  <p>
                    <strong>Strefa czasowa:</strong> {meeting.timezone}
                  </p>
                  {meeting.guestNotes && (
                    <p>
                      <strong>Notatki:</strong> {meeting.guestNotes}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* HISTORIA WIZYT */}
      <div>
        <h4 className="text-xl font-bold mb-4">HISTORIA WIZYT</h4>
        {pastMeetings.length === 0 ? (
          <p>Brak historycznych spotkań.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastMeetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader>
                  <CardTitle>{meeting.guestName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Data:</strong>{" "}
                    {formatMeetingDate(meeting.startTime)}
                  </p>
                  <p>
                    <strong>Strefa czasowa:</strong> {meeting.timezone}
                  </p>
                  {meeting.guestNotes && (
                    <p>
                      <strong>Notatki:</strong> {meeting.guestNotes}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
