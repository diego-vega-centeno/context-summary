import bcrypt from "bcryptjs";
import { dummyPRs, users } from "@/lib/data/dummy-data";

// for local postgreSQL
import sql from "../lib/db";
import logger from "../lib/logger";

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
  DO $$ BEGIN
    CREATE TYPE oauth_provider_type AS ENUM ('google', 'github');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      oauth_id TEXT UNIQUE,
      oauth_provider oauth_provider_type,
      name VARCHAR(255) NOT NULL,
      email TEXT UNIQUE,
      password TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

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

// export async function GET() {
//   try {
//     // use one at a time because it slow downs

//     // await seedUsers();
//     // await seedCustomers();
//     // await seedInvoices();
//     // await seedRevenue();

//     return Response.json({ message: "Database seeded successfully" });
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }

export async function seedTrackingWorkItems() {
  await sql`
  DO $$ BEGIN
    CREATE TYPE work_item_status AS ENUM ('open', 'closed', 'merged', 'stale');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$
`;

  await sql`
    CREATE TABLE IF NOT EXISTS tracked_work_items (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      provider work_provider NOT NULL,
      owner TEXT NOT NULL,
      container TEXT NOT NULL,
      external_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      status work_item_status NOT NULL,
      author TEXT NOT NULL,
      created_at TIMESTAMP,
      last_activity_at TIMESTAMP,
      last_synced_at TIMESTAMP,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      UNIQUE (user_id, provider, owner, container, external_id)
    )
  `;

  const tracked_work_items = await sql`
  INSERT INTO tracked_work_items ${sql(dummyPRs, "id", "user_id", "provider", "owner", "container", "external_id", "title", "status", "author", "created_at", "last_activity_at", "last_synced_at", "added_at")}
  ON CONFLICT (id) DO NOTHING
`;

  return tracked_work_items;
}

async function seedPRSummaries() {
  await sql`
    CREATE TABLE IF NOT EXISTS work_item_summaries (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      pr_id UUID REFERENCES tracked_work_items(id) ON DELETE CASCADE UNIQUE,
      summary_json JSONB NOT NULL,
      generated_at TIMESTAMP
    );
  `;

  const prSummaries = dummyPRs
    .filter((pr) => pr.summary)
    .map((pr) => ({
      id: pr.summary!.id,
      pr_id: pr.id,
      summary_json: pr.summary!.summary_json as any,
      generated_at: pr.summary!.generated_at,
    }));

  const insertedPRSummaries = await sql`
        INSERT INTO work_item_summaries ${sql(prSummaries, "id", "pr_id", "summary_json", "generated_at")}
        ON CONFLICT (id) DO NOTHING;
      `;

  return insertedPRSummaries;
}

seedUsers()
  .then(() => seedTrackingWorkItems())
  .then(() => seedPRSummaries())
  .then(() => sql.end())
  .catch((error) => logger.error(error));
