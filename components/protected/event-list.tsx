// components/protected/event-list.tsx
"use client";
import { CalendarEvent } from "@/types/calendar";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"; // Upewnij się, że ścieżka jest poprawna
import { format } from "date-fns";
import { Clock, Info, MapPinned } from "lucide-react";
import { pl } from "date-fns/locale";
// import CancelButton from "./cancel-button";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
// import { deleteEvent } from "@/server/googleCalendar";

interface EventsListProps {
  events: CalendarEvent[];
  clerkUserId: string;
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [localEvents, setLocalEvents] = useState(events);
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/delete-event?id=${selectedEventId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setLocalEvents(localEvents.filter((e) => e.id !== selectedEventId));
      router.refresh();
    } else {
      console.error("Failed to delete event");
    }
  };
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {events.length === 0 ? (
        <p className="text-center text-gray-500">Brak wydarzeń.</p>
      ) : (
        events.map((event) => (
          <Card
            key={event.id}
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {event.summary || "Brak tytułu"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex mb-2 text-gray-600">
                <MapPinned className="mr-2" />
                <strong className="mr-2">Lokalizacja: </strong> Andrzej 3,
                05-800 Pruszków
              </p>

              <p className="flex text-gray-600">
                <Clock className="mr-2" />
                <strong className="mr-2">Data: </strong>{" "}
                {event.start?.dateTime
                  ? format(
                      new Date(event.start.dateTime),
                      "dd MMM yyyy, 'g.' HH:mm",
                      { locale: pl }
                    )
                  : event.start?.date
                  ? format(
                      new Date(event.start.date),
                      "dd MMM yyyy, 'g.' HH:mm",
                      { locale: pl }
                    )
                  : "Brak daty"}
              </p>
              {event.description && (
                <CardDescription className="flex mb-2 mt-2 text-gray-700">
                  <Info className="mr-2" />
                  {event.description}
                </CardDescription>
              )}
            </CardContent>
            <CardFooter>
              <Dialog
                open={selectedEventId === event.id}
                onOpenChange={(open) => {
                  if (!open) setSelectedEventId(null);
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    onClick={() => setSelectedEventId(event.id!)}
                  >
                    Anuluj spotkanie
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Czy na pewno chcesz usunąć to spotkanie?
                    </DialogTitle>
                    <DialogDescription>
                      Tej akcji nie można cofnąć.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedEventId(null)}
                    >
                      Anuluj
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                      Potwierdź
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default EventsList;
