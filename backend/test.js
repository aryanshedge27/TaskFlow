const { MongoClient } = require("mongodb");
require("dotenv").config();

async function main() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    console.log("✅ Connected Successfully");
  } catch (err) {
    console.error("❌ Error:");
    console.error(err);
  } finally {
    await client.close();
  }
}

main();