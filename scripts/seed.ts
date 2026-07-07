import bcrypt from "bcryptjs";
import { dummyWorkItems, users } from "@/lib/data/dummy-data";
import { readFile } from "node:fs/promises";

// for local postgreSQL
import sql from "../lib/db";
import logger from "../lib/logger";

// create tables
async function useSchema() {
  const schema = await readFile("./schema.sql", "utf8");
  await sql.unsafe(schema);

  console.log("Schema created.");
}

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      logger.log(`Seeding user ${user.name}...`);
      const hashedPassword = await bcrypt.hash(user.password, 4);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

export async function seedTrackingWorkItems() {
  const tracked_work_items = await sql`
  INSERT INTO tracked_work_items ${sql(dummyWorkItems, "id", "user_id", "provider", "work_item_type", "owner", "container", "external_id", "title", "status", "author", "created_at", "last_activity_at", "last_synced_at", "added_at")}
  ON CONFLICT (id) DO NOTHING
`;

  return tracked_work_items;
}

async function seedWorkItemSummaries() {

  const workItemSummaries = dummyWorkItems
    .filter((wi) => wi.summary)
    .map((wi) => ({
      id: wi.summary!.id,
      work_item_id: wi.id,
      summary_json: wi.summary!.summary_json as any,
      generated_at: wi.summary!.generated_at,
    }));

  const insertedWorkItemSummaries = await sql`
        INSERT INTO work_item_summaries ${sql(workItemSummaries, "id", "work_item_id", "summary_json", "generated_at")}
        ON CONFLICT (id) DO NOTHING;
      `;

  return insertedWorkItemSummaries;
}

async function main() {
  await useSchema();
  await seedUsers();
  await seedTrackingWorkItems();
  await seedWorkItemSummaries();
  await sql.end();
}

main().catch((error) => {
  logger.error(error);
});