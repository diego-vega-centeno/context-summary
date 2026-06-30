import postgres from "postgres";

const connectionString =
  process.env.SUPABASE_POSTGRE_DIRECT_URI! ||
  process.env.POSTGRES_URL!
const sql = postgres(connectionString, {
  ssl: "require",
  prepare: false,
});

export default sql;
