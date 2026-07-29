import { db } from "../db/mongodb.js";
import { ObjectId } from "mongodb";

const benefitsCollection = db.collection("benefits");

async function createBenfits(soldierID, benfit) {
  const result = await benefitsCollection.insertOne({
    ...benfit,
    soldierID: new ObjectId(soldierID),
  });
  return result;
}

async function soldeirIDexsits(id){
  const benfit = await benefitsCollection.findOne({ soldierID: new ObjectId(id) });
  return benfit !== null;
}


export async function getBySoldierID(soldierID){
    const benefit = await benefitsCollection.findOne({ soldierID: new ObjectId(soldierID) })
    return benefit
}




export const benfitsRepo = {
    addBenfits: createBenfits,
    soldierIsExsits: soldeirIDexsits,
    getBenfitsBySoldierID: getBySoldierID

}