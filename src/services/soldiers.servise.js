import { benfitsRepo } from "../dal/soldires.dal.js";
import { createError } from "../utils/creatError.js";

export async function createBenefits(soldierID, data) {
  const reslut = await benfitsRepo.soldierIsExsits(soldierID);
  if (reslut) throw createError(409, "Soldeir id exists");
  const benefit = {
    unit: data.unit,
    currentBenfitType: data.benefitType,
    history: [
      {
        startDate: data.startDate || new Date(),
        endDate: null,
        decisionReason: data.decisionReason,
        benfitType: data.benefitType,
        details: data.details
      },
    ],
  };
  const newBenfit = await benfitsRepo.addBenfits(soldierID, benefit);
  return { _id: newBenfit.insertedId, soldierID, ...benefit };
}
