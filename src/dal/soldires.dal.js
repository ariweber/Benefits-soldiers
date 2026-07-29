import { db } from "../db/mongodb.js";
import { ObjectId } from "mongodb";

const benefitsCollection = db.collection("benefits");

async function createUser(benfit) {
  const result = await benefitsCollection.insertOne({
    ...benfit,
    history: [],
  });
  return result.insertedId.toString();
}


