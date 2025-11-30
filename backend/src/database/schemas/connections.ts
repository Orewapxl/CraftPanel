import { json, mysqlTable, timestamp, varchar} from "drizzle-orm/mysql-core";
import { UsersTable } from "./users";
import { sql } from "drizzle-orm";

export const connectionsTable = mysqlTable("conncetions", {
    ID: varchar("ID", {length: 36})
        .primaryKey()
        .notNull()
        .$default(() => crypto.randomUUID()),
    service: varchar("service", {length: 255}).notNull(),
    accessToken: varchar("AccessToken", {length: 255}).notNull(),
    userID: varchar("UserID", { length: 36}).references(() => UsersTable.ID, {
        onDelete: "cascade",
    }),
    serviceUser: json("ServiceUser")
        .notNull()
        .default(sql`'{}'`),
    createdAt: timestamp("CreatedAt").defaultNow(),
    updateAt: timestamp("UpdatedAt").defaultNow().onUpdateNow(),
});