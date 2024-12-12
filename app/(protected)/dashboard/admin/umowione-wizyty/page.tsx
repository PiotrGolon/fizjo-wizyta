// ScheduledAppointmentAdminPage.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAndSortUserGoogleCalendarEvents } from "@/server/googleCalendar";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import EventsList from "@/components/protected/event-list"; // Upewnij się, że ścieżka jest poprawna

const ScheduledAppointmentAdminPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return <p>Unauthorized</p>;
  }

  try {
    const { upcoming, past } = await fetchAndSortUserGoogleCalendarEvents(
      userId
    );

    return (
      <Tabs defaultValue="upcoming" className="max-w-screen-2xl mx-4 mt-4">
        <TabsList>
          <TabsTrigger value="upcoming">Nadchodzące</TabsTrigger>
          <TabsTrigger value="past">Historia</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <EventsList clerkUserId={userId} events={upcoming} />
        </TabsContent>
        <TabsContent value="past">
          <EventsList clerkUserId={userId} events={past} />
        </TabsContent>
      </Tabs>
    );
  } catch (error) {
    console.error("Error fetching user meetings:", error);
    return <p>Błąd podczas pobierania wydarzeń.</p>;
  }
};

export default ScheduledAppointmentAdminPage;
