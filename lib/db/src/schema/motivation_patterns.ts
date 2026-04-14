import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const motivationPatternsTable = pgTable("motivation_patterns", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => usersTable.deviceId, { onDelete: "cascade" }),
  logDate: date("log_date").notNull(),
  chatSessionCount: integer("chat_session_count").default(0),
  resourcesViewed: integer("resources_viewed").default(0),
  workshopEngaged: boolean("workshop_engaged").default(false),
  communityPost: boolean("community_post").default(false),
  jitaiTriggered: boolean("jitai_triggered").default(false),
  jitaiAccepted: boolean("jitai_accepted").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMotivationPatternSchema = createInsertSchema(motivationPatternsTable).omit({ id: true, createdAt: true });
export type InsertMotivationPattern = z.infer<typeof insertMotivationPatternSchema>;
export type MotivationPattern = typeof motivationPatternsTable.$inferSelect;
