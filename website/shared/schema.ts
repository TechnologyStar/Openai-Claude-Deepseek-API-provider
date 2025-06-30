import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const apiProviders = pgTable("api_providers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  displayName: text("display_name").notNull(),
  url: text("url").notNull(),
  tags: jsonb("tags").notNull().$type<string[]>(),
  notes: text("notes"),
  isActive: boolean("is_active").notNull().default(true),
  isRecommended: boolean("is_recommended").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const recommendedApps = pgTable("recommended_apps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  githubUrl: text("github_url"),
  websiteUrl: text("website_url"),
  icon: text("icon").notNull(),
  tags: jsonb("tags").notNull().$type<string[]>(),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertApiProviderSchema = createInsertSchema(apiProviders).omit({
  id: true,
});

export const insertRecommendedAppSchema = createInsertSchema(recommendedApps).omit({
  id: true,
});

export type ApiProvider = typeof apiProviders.$inferSelect;
export type InsertApiProvider = z.infer<typeof insertApiProviderSchema>;
export type RecommendedApp = typeof recommendedApps.$inferSelect;
export type InsertRecommendedApp = z.infer<typeof insertRecommendedAppSchema>;
