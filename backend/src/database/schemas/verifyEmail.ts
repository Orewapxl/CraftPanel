import {
  boolean,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { UsersTable } from "./users";

export const emailVerificationTable = mysqlTable("email_verifications", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  userId: varchar("user_id", { length: 36 })
    .references(() => UsersTable.id, { onDelete: "cascade" })
    .notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  used: boolean("used").default(false).notNull(),
});