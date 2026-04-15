import { pgTable, text, serial, integer, timestamp, date, index } from "drizzle-orm/pg-core";
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
}, (t) => [
  index("mood_logs_user_date_idx").on(t.userId, t.logDate),
  index("mood_logs_user_id_idx").on(t.userId),
]);

export const insertMoodLogSchema = createInsertSchema(moodLogsTable).omit({ id: true, createdAt: true });
export type InsertMoodLog = z.infer<typeof insertMoodLogSchema>;
export type MoodLog = typeof moodLogsTable.$inferSelect;
