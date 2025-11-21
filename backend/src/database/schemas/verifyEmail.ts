import {
  boolean,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { UsersTable } from "./users";

export const emailVerificationTable = mysqlTable("email_verifications", {
  ID: varchar("ID", { length: 36 }).primaryKey().notNull(),
  userID: varchar("user_ID", { length: 36 })
    .references(() => UsersTable.ID, { onDelete: "cascade" })
    .notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  used: boolean("used").default(false).notNull(),
});