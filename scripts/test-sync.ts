import { addPR } from "@/lib/actions/pr";
import logger from "@/lib/logger";

async function runTest() {
  logger.log("Starting test sync...");
  const formData = new FormData();
  formData.append("url", "https://github.com/vercel/next.js/pull/93949");

  const res = await addPR(null, formData);
  logger.log("Test Result:", res);
  process.env.POSTGRES_URL = process.exit(0);
}

runTest();
