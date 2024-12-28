import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  date as pgDate,
} from "drizzle-orm/pg-core";

const createdAt = timestamp("createdAt").notNull().defaultNow();
const updatedAt = timestamp("updatedAt")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const EventTable = pgTable(
  "events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    durationInMinutes: integer("durationInMinutes").notNull(),
    clerkUserId: text("clerkUserId").notNull(),
    isActive: boolean("isActive").notNull().default(true),
    createdAt,
    updatedAt,
  },
  (table) => ({
    clerkUserIdIndex: index("clerkUserIdIndex").on(table.clerkUserId),
  })
);

export const ScheduleTable = pgTable("schedules", {
  id: uuid("id").primaryKey().defaultRandom(),
  timezone: text("timezone").notNull(),
  clerkUserId: text("clerkUserId").notNull().unique(),
  createdAt,
  updatedAt,
});

export const scheduleRelations = relations(ScheduleTable, ({ many }) => ({
  availabilities: many(ScheduleAvailabilityTable),
  dateAvailabilities: many(ScheduleDateAvailabilityTable),
}));

export const scheduleDayOfWeekEnum = pgEnum("day", DAYS_OF_WEEK_IN_ORDER);

export const ScheduleAvailabilityTable = pgTable(
  "scheduleAvailabilities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    scheduleId: uuid("scheduleId")
      .notNull()
      .references(() => ScheduleTable.id, { onDelete: "cascade" }),
    startTime: text("startTime").notNull(),
    endTime: text("endTime").notNull(),
    dayOfWeek: scheduleDayOfWeekEnum("dayOfWeek").notNull(),
  },
  (table) => ({
    scheduleIdIndex: index("scheduleIdIndex").on(table.scheduleId),
  })
);

export const ScheduleAvailabilityRelations = relations(
  ScheduleAvailabilityTable,
  ({ one }) => ({
    schedule: one(ScheduleTable, {
      fields: [ScheduleAvailabilityTable.scheduleId],
      references: [ScheduleTable.id],
    }),
  })
);

export const MeetingsTable = pgTable("meetings", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkUserId: text("clerkUserId").notNull(),
  timezone: text("timezone").notNull(),
  startTime: timestamp("startTime").notNull(),
  eventId: uuid("eventId")
    .notNull()
    .references(() => EventTable.id, { onDelete: "cascade" }),
  guestEmail: text("guestEmail").notNull(),
  guestName: text("guestName").notNull(),
  guestNotes: text("guestNotes"),
  createdAt,
  updatedAt,
});

export const meetingsRelations = relations(MeetingsTable, ({ one }) => ({
  event: one(EventTable, {
    fields: [MeetingsTable.eventId],
    references: [EventTable.id],
  }),
}));

export const ScheduleDateAvailabilityTable = pgTable(
  "scheduleDateAvailabilities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    scheduleId: uuid("scheduleId")
      .notNull()
      .references(() => ScheduleTable.id, { onDelete: "cascade" }),
    date: pgDate("date").notNull(), // Konkretny dzień
    startTime: text("startTime").notNull(),
    endTime: text("endTime").notNull(),
  },
  (table) => ({
    scheduleIdIndex: index("scheduleDateAvailability_scheduleIdIndex").on(
      table.scheduleId
    ),
  })
);

export const ScheduleDateAvailabilityRelations = relations(
  ScheduleDateAvailabilityTable,
  ({ one }) => ({
    schedule: one(ScheduleTable, {
      fields: [ScheduleDateAvailabilityTable.scheduleId],
      references: [ScheduleTable.id],
    }),
  })
);
