"use client";

import { contactFormSchema, ContactFormValues } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";

const ContactForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contactMessage: "",
    },
  });

  const [messageLength, setMessageLength] = useState<number>(0);

  const onSubmit = (values: ContactFormValues) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="lg:flex lg:gap-x-4 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-green-500 text-md">
                  Imię i nazwisko
                </FormLabel>
                <FormControl>
                  <Input placeholder="Jan Kowalski" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full mt-4 lg:mt-0">
                <FormLabel className="text-green-500 text-md">Email</FormLabel>
                <FormControl>
                  <Input placeholder="jan.kowalski@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="contactMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-500 text-md">
                Wiadomość
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mam pytanie odnośnie..."
                  maxLength={400}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setMessageLength(e.target.value.length); // Aktualizacja licznika znaków
                  }}
                />
              </FormControl>
              <div className="text-right text-sm text-gray-400 text-muted-foreground">
                {messageLength}/400 znaków
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="signIn" className="w-full  mt-4">
          Wyślij
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
