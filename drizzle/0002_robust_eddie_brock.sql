CREATE TABLE IF NOT EXISTS "scheduleDateAvailabilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scheduleId" uuid NOT NULL,
	"date" date NOT NULL,
	"startTime" text NOT NULL,
	"endTime" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scheduleDateAvailabilities" ADD CONSTRAINT "scheduleDateAvailabilities_scheduleId_schedules_id_fk" FOREIGN KEY ("scheduleId") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "scheduleDateAvailability_scheduleIdIndex" ON "scheduleDateAvailabilities" USING btree ("scheduleId");