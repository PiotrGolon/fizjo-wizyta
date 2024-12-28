import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";
import { groupBy } from "lodash";
import { db } from "@/drizzle/db";
import {
  ScheduleAvailabilityTable,
  ScheduleDateAvailabilityTable,
} from "@/drizzle/schema";
import { getCalendarEventTimes } from "@/server/googleCalendar";
import {
  addMinutes,
  areIntervalsOverlapping,
  format,
  Interval,
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
  isWithinInterval,
  setHours,
  setMinutes,
} from "date-fns";
import { fromZonedTime } from "date-fns-tz";

export async function getValidTimesFromSchedule(
  timesInOrder: Date[],
  event: { clerkUserId: string; durationInMinutes: number }
) {
  const start = timesInOrder[0];
  const end = timesInOrder.at(-1);
  if (start == null || end === null || end === undefined) return [];

  const schedule = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId: userIdCol }, { eq }) =>
      eq(userIdCol, event.clerkUserId),
    with: { availabilities: true, dateAvailabilities: true },
  });

  if (schedule == null) return [];

  const groupedAvailabilities = groupBy(
    schedule.availabilities,
    (a) => a.dayOfWeek
  );

  const eventTimes = await getCalendarEventTimes(event.clerkUserId, {
    start,
    end,
  });

  // Filtrowanie timesInOrder oparte na dostępności i eventach w kalendarzu
  return timesInOrder.filter((intervalDate) => {
    const availabilities = getAvailabilities(
      groupedAvailabilities,
      intervalDate,
      schedule.timezone,
      schedule.dateAvailabilities
    );

    const eventInterval = {
      start: intervalDate,
      end: addMinutes(intervalDate, event.durationInMinutes),
    };

    // 1. Czy nie koliduje z eventami w Google Calendar?
    const noOverlapWithCalendar = eventTimes.every(
      (eventTime: Interval<Date>) => {
        return !areIntervalsOverlapping(eventTime, eventInterval);
      }
    );

    // 2. Czy mieści się w jednym z dostępnych slotów (tygodniowym lub datowym)?
    const fitsInAvailability = availabilities.some((availability) => {
      return (
        isWithinInterval(eventInterval.start, availability) &&
        isWithinInterval(eventInterval.end, availability)
      );
    });

    return noOverlapWithCalendar && fitsInAvailability;
  });
}

function getAvailabilities(
  groupedAvailabilities: Partial<
    Record<
      (typeof DAYS_OF_WEEK_IN_ORDER)[number],
      (typeof ScheduleAvailabilityTable.$inferSelect)[]
    >
  >,
  date: Date,
  timezone: string,
  dateAvailabilities: (typeof ScheduleDateAvailabilityTable.$inferSelect)[]
) {
  // 1. Wydobądź tygodniowe sloty:
  let weeklyAvailabilities:
    | (typeof ScheduleAvailabilityTable.$inferSelect)[]
    | undefined;

  if (isMonday(date)) {
    weeklyAvailabilities = groupedAvailabilities.poniedziałek;
  } else if (isTuesday(date)) {
    weeklyAvailabilities = groupedAvailabilities.wtorek;
  } else if (isWednesday(date)) {
    weeklyAvailabilities = groupedAvailabilities.środa;
  } else if (isThursday(date)) {
    weeklyAvailabilities = groupedAvailabilities.czwartek;
  } else if (isFriday(date)) {
    weeklyAvailabilities = groupedAvailabilities.piątek;
  } else if (isSaturday(date)) {
    weeklyAvailabilities = groupedAvailabilities.sobota;
  } else if (isSunday(date)) {
    weeklyAvailabilities = groupedAvailabilities.niedziela;
  }

  // Upewniamy się, że mamy tablicę (nie undefined)
  weeklyAvailabilities = weeklyAvailabilities ?? [];

  const weeklyIntervals = weeklyAvailabilities.map(({ startTime, endTime }) => {
    const start = fromZonedTime(
      setMinutes(
        setHours(date, +startTime.split(":")[0]),
        +startTime.split(":")[1]
      ),
      timezone
    );
    const end = fromZonedTime(
      setMinutes(
        setHours(date, +endTime.split(":")[0]),
        +endTime.split(":")[1]
      ),
      timezone
    );
    return { start, end };
  });

  // 2. Wydobądź sloty datowe:
  const dateString = format(date, "yyyy-MM-dd");
  const exactDaySlots = dateAvailabilities.filter((slot) => {
    // Zakładam, że slot.date jest stringiem w stylu "2024-01-10"
    return slot.date === dateString;
  });

  const exactDayIntervals = exactDaySlots.map(({ startTime, endTime }) => {
    const start = fromZonedTime(
      setMinutes(
        setHours(date, +startTime.split(":")[0]),
        +startTime.split(":")[1]
      ),
      timezone
    );
    const end = fromZonedTime(
      setMinutes(
        setHours(date, +endTime.split(":")[0]),
        +endTime.split(":")[1]
      ),
      timezone
    );
    return { start, end };
  });

  // 3. Zwróć jedną z opcji:
  //  - Nadpisywanie
  if (exactDayIntervals.length > 0) {
    return exactDayIntervals;
  }

  //  - albo sumowanie
  // return [...weeklyIntervals, ...exactDayIntervals];

  // Tu zrobimy nadpisywanie z priorytetem datowych
  return weeklyIntervals;
}
