import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const authUsersTable = pgTable("auth_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAuthUserSchema = createInsertSchema(authUsersTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectAuthUserSchema = createSelectSchema(authUsersTable).omit({
  passwordHash: true,
});

export type InsertAuthUser = z.infer<typeof insertAuthUserSchema>;
export type AuthUser = typeof authUsersTable.$inferSelect;
export type PublicAuthUser = Omit<AuthUser, "passwordHash">;
