"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // albo inna utilka do łączenia klas
import { pl } from "date-fns/locale";

interface DatePickerProps {
  value?: string;
  onChange: (val: string) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  // Zamień string "yyyy-MM-dd" na obiekt Date (potrzebny do <Calendar />)
  const selectedDate = value ? parseISO(`${value}T00:00:00`) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full lg:w-auto justify-center text-center hover:bg-green-100 font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {selectedDate
            ? format(selectedDate, "PPP", { locale: pl })
            : "Wybierz datę..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date) {
              // Zwracamy date w formacie 'yyyy-MM-dd' (np. "2024-01-10")
              onChange(format(date, "yyyy-MM-dd"));
            }
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
