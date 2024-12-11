"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema } from "@/schemas/event";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
// import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { Button } from "../ui/button";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { createEvent, deleteEvent, updateEvent } from "@/server/actions/event";
import { useTransition } from "react";

export function EventForm({
  event,
}: {
  event?: {
    id: string;
    name: string;
    description?: string;
    durationInMinutes: number;
    isActive: boolean;
  };
}) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event ?? {
      name: "",
      isActive: true,
      durationInMinutes: 60,
    },
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const action =
      event == null ? createEvent : updateEvent.bind(null, event.id);
    const data = await action(values);

    if (data?.error) {
      form.setError("root", {
        message: "Wystąpił błąd w zapisie nowego rodzaju wizyty!",
      });
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col"
      >
        {form.formState.errors.root && (
          <div className="text-destructive text-lg bg-red-100 rounded-md text-center py-2">
            {form.formState.errors.root.message}
          </div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-600">Nazwa wizyty</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="text-green-700">
                Nazwa wizyty będzie widoczna w trakcie rezerwowania
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="durationInMinutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-600">
                Czas trwania wizyty
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription className="text-green-700">
                W minutach
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-600">
                Dodatkowe informacje
              </FormLabel>
              <FormControl>
                <Textarea className="resize-none h-32" {...field} />
              </FormControl>
              <FormDescription className="text-green-700">
                Opcjonalne informacje na temat wizyty
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-green-600">Aktywna</FormLabel>
              </div>
              <FormDescription className="text-green-700">
                Opcjonalne informacje na temat wizyty
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-2 justify-end">
          {event && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full md:w-auto"
                  variant="destructiveGhost"
                  disabled={isDeletePending || form.formState.isSubmitting}
                >
                  Usuń
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Jesteś pewien?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Jeśli potwierdzisz ten rodzaj wizyty zostanie usunięty na
                    stałe
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Anuluj</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeletePending || form.formState.isSubmitting}
                    variant="destructive"
                    onClick={() => {
                      startDeleteTransition(async () => {
                        const data = await deleteEvent(event.id);

                        if (data?.error) {
                          form.setError("root", {
                            message: "There was an error deleting your event",
                          });
                        }
                      });
                    }}
                  >
                    Potwierdź
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button
            disabled={isDeletePending || form.formState.isSubmitting}
            className="text-green-700 hover:text-green-800 duration-300 w-full md:w-auto"
            type="button"
            asChild
            variant="outline"
          >
            <Link href="/dashboard/admin">Anuluj</Link>
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-500 hover:opacity-95 duration-300 w-full md:w-auto"
            disabled={isDeletePending || form.formState.isSubmitting}
            type="submit"
          >
            Zapisz
          </Button>
        </div>
      </form>
    </Form>
  );
}
