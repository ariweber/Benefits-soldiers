import {MongoClient} from "mongodb"
import "dotenv/config"


export const client = new MongoClient(process.env.MONGO_URL);


try {
  await client.connect()
  console.log("mongo connected")
} catch (error) {
  console.error("mongo connection failed:", error.message)
  process.exit(1)
}

export const db = client.db(process.env.DB_NAME)