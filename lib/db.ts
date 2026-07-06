import postgres from "postgres";

const connectionString =
  process.env.NODE_ENV === "development"
    ? process.env.POSTGRES_URL!
    : process.env.SUPABASE_POSTGRE_DIRECT_URI!;

const sql = postgres(connectionString, {
  ssl: process.env.NODE_ENV === "development" ? false : "require",
  prepare: false,
});

export default sql;
