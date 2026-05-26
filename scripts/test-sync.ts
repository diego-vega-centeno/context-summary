import { addPR } from "@/lib/actions/pr";

async function runTest() {
  console.log("Starting test sync...");
  const res = await addPR("vercel", "next.js", 93949);
  console.log("Test Result:", res);
  process.env.POSTGRES_URL = 
  process.exit(0);
}

runTest();
