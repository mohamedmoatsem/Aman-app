import { pgTable, text, serial, integer, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const moodLogsTable = pgTable("mood_logs", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => usersTable.deviceId, { onDelete: "cascade" }),
  moodIndex: integer("mood_index").notNull(),
  moodLabel: text("mood_label").notNull(),
  score: integer("score").notNull(),
  logDate: date("log_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMoodLogSchema = createInsertSchema(moodLogsTable).omit({ id: true, createdAt: true });
export type InsertMoodLog = z.infer<typeof insertMoodLogSchema>;
export type MoodLog = typeof moodLogsTable.$inferSelect;
