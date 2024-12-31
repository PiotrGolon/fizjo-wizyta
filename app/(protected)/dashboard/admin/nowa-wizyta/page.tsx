import { EventForm } from "@/components/forms/event-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NowaWizytaPage() {
  return (
    <Card className="max-w-screen-2xl mt-4 mx-4 bg-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-blue-700 text-xl">
          Dodaj nowy rodzaj wizyty
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm />
      </CardContent>
    </Card>
  );
}
