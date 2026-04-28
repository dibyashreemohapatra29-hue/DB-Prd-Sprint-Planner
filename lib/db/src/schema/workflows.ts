import { pgTable, serial, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const workflowsTable = pgTable("workflows", {
  id:            serial("id").primaryKey(),
  featureTitle:  text("feature_title").notNull(),
  description:   text("description").notNull(),
  targetUsers:   text("target_users").default("").notNull(),
  businessGoal:  text("business_goal").default("").notNull(),
  summary:       text("summary").notNull(),
  prd:           jsonb("prd").notNull(),
  items:         jsonb("items").notNull(),
  insights:      jsonb("insights").notNull(),
  metadata:      jsonb("metadata").notNull(),
  createdAt:     timestamp("created_at").defaultNow().notNull(),
});

export const insertWorkflowSchema = createInsertSchema(workflowsTable).omit({ id: true, createdAt: true });
export const selectWorkflowSchema = createSelectSchema(workflowsTable);

export type InsertWorkflow = z.infer<typeof insertWorkflowSchema>;
export type Workflow       = typeof workflowsTable.$inferSelect;
