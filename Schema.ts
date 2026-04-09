import { pgTable, text, serial, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const clientsTable = pgTable("clients", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").unique().notNull(),
  businessName: text("business_name"),
  location: text("location"),
  products: text("products"),
  targetCustomer: text("target_customer"),
  officeTimings: text("office_timings"),
  goal: text("goal"),
  agentType: text("agent_type").default("general"),
  isOnboarded: boolean("is_onboarded").notNull().default(false),
  onboardingStep: integer("onboarding_step").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertClientSchema = createInsertSchema(clientsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clientsTable.$inferSelect;
