import postgres from "postgres";

const connectionString =
  process.env.SUPABASE_POSTGRE_DIRECT_URI! ||
  process.env.POSTGRES_URL! ||
  "postgresql://postgres:elefant4@localhost:5432/summary-context";
const sql = postgres(connectionString, {
  ssl: "require",
  prepare: false,
});

export default sql;
