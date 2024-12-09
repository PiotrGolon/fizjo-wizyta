import { EventForm } from "@/components/forms/event-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NowaWizytaPage() {
  return (
    <Card className="lg:max-w-4xl md:max-w-3xl max-w-md mx-auto mt-4 bg-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-green-700 text-xl">
          Dodaj nowy rodzaj wizyty
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm />
      </CardContent>
    </Card>
  );
}
