import "use-server";
import { clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";
import { addMinutes, endOfDay, startOfDay } from "date-fns";
import { CalendarEvent } from "@/types/calendar";

interface SortedEvents {
  upcoming: CalendarEvent[];
  past: CalendarEvent[];
}

export async function deleteEvent(clerkUserId: string, eventId: string) {
  const oAuthClient = await getOAuthClient(clerkUserId);

  if (!oAuthClient) {
    throw new Error(
      "Nie można uzyskać klienta OAuth. Upewnij się, że użytkownik autoryzował aplikację w Google."
    );
  }

  const calendar = google.calendar({ version: "v3", auth: oAuthClient });

  try {
    await calendar.events.delete({
      calendarId: "primary",
      eventId: eventId,
    });
  } catch (error) {
    console.error("Błąd podczas usuwania wydarzeń z Google Calendar:", error);
    throw new Error("Nie udało się usunąć wydarzenia z Google Calendar.");
  }
}

export async function fetchAndSortUserGoogleCalendarEvents(
  clerkUserId: string
): Promise<SortedEvents> {
  const oAuthClient = await getOAuthClient(clerkUserId);

  if (!oAuthClient) {
    throw new Error(
      "Nie można uzyskać klienta OAuth. Upewnij się, że użytkownik autoryzował aplikację w Google."
    );
  }

  const calendar = google.calendar({ version: "v3", auth: oAuthClient });

  const now = new Date();

  try {
    const eventsResponse = await calendar.events.list({
      calendarId: "primary",
      singleEvents: true,
      orderBy: "startTime",
      timeMin: new Date(1970, 0, 1).toISOString(), // Minimalna data (epoka Unix)
      timeMax: new Date(2100, 0, 1).toISOString(), // Maksymalna data w przyszłości
      maxResults: 2500,
    });

    const events = eventsResponse.data.items || [];

    const upcoming: CalendarEvent[] = [];
    const past: CalendarEvent[] = [];

    events.forEach((event: CalendarEvent) => {
      let eventStart: Date | null = null;

      if (event.start?.date) {
        eventStart = startOfDay(new Date(event.start.date));
      } else if (event.start?.dateTime) {
        eventStart = new Date(event.start.dateTime);
      }

      if (eventStart) {
        if (eventStart >= now) {
          upcoming.push(event);
        } else {
          past.push(event);
        }
      }
    });

    return { upcoming, past };
  } catch (error) {
    console.error("Błąd podczas pobierania wydarzeń z Google Calendar:", error);
    throw new Error("Nie udało się pobrać wydarzeń z Google Calendar.");
  }
}

export async function getCalendarEventTimes(
  clerkUserId: string,
  { start, end }: { start: Date; end: Date }
) {
  const oAuthClient = await getOAuthClient(clerkUserId);

  const events = await google.calendar("v3").events.list({
    calendarId: "primary",
    eventTypes: ["default"],
    singleEvents: true,
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    maxResults: 2500,
    auth: oAuthClient,
  });

  return (
    events.data.items
      ?.map((event: CalendarEvent) => {
        if (event.start?.date != null && event.end?.date != null) {
          return {
            start: startOfDay(event.start.date),
            end: endOfDay(event.end.date),
          };
        }

        if (event.start?.dateTime != null && event.end?.dateTime != null) {
          return {
            start: new Date(event.start.dateTime),
            end: new Date(event.end.dateTime),
          };
        }
      })
      .filter((date: { start: Date; end: Date }) => date != null) || []
  );
}

export async function createCalendarEvent({
  clerkUserId,
  guestName,
  guestEmail,
  startTime,
  guestNotes,
  durationInMinutes,
  eventName,
}: {
  clerkUserId: string;
  guestName: string;
  guestEmail: string;
  startTime: Date;
  guestNotes?: string | null;
  durationInMinutes: number;
  eventName: string;
}) {
  const oAuthClient = await getOAuthClient(clerkUserId);
  const calendarUser = await clerkClient().users.getUser(clerkUserId);
  if (calendarUser.primaryEmailAddress == null) {
    throw new Error("Clerk user has no email");
  }

  const calendarEvent = await google.calendar("v3").events.insert({
    calendarId: "primary",
    auth: oAuthClient,
    sendUpdates: "all",
    requestBody: {
      attendees: [
        { email: guestEmail, displayName: guestName },
        {
          email: calendarUser.primaryEmailAddress.emailAddress,
          displayName: calendarUser.fullName,
          responseStatus: "accepted",
        },
      ],
      description: guestNotes
        ? `Dodatkowe informacje: ${guestNotes}`
        : undefined,
      start: {
        dateTime: startTime.toISOString(),
      },
      end: {
        dateTime: addMinutes(startTime, durationInMinutes).toISOString(),
      },
      summary: `Wizyta z ${guestName} u ${calendarUser.fullName}: ${eventName}`,
    },
  });

  return calendarEvent.data;
}

async function getOAuthClient(clerkUserId: string) {
  const token = await clerkClient().users.getUserOauthAccessToken(
    clerkUserId,
    "oauth_google"
  );

  if (token.data.length === 0 || token.data[0].token == null) {
    return;
  }

  const client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    process.env.GOOGLE_OAUTH_REDIRECT_URL
  );

  client.setCredentials({ access_token: token.data[0].token });

  return client;
}
