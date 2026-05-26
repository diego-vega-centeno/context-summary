import { addPR } from "@/lib/actions/pr";
import logger from "@/lib/logger";

async function runTest() {
  logger.log("Starting test sync...");
  const res = await addPR("vercel", "next.js", 93949);
  logger.log("Test Result:", res);
  process.env.POSTGRES_URL = 
  process.exit(0);
}

runTest();
