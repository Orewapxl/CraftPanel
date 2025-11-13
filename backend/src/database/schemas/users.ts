import { sql } from "drizzle-orm";
import { boolean, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";




export const UsersTable = mysqlTable("usersTable", {
    id: varchar("id", { length: 36 }).primaryKey().notNull().$default(() => crypto.randomUUID()),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    ProfilePicture: varchar("profilePicture", { length: 255 }),
    name: varchar("name", { length: 255 }),
    emailVerified: boolean("emailVerified").notNull().default(false).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    UpdatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),

});
