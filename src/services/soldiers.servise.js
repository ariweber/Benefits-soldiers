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

export async function getBenefitsBySoldier(soldierID) {
  const benefit = await benfitsRepo.getBenfitsBySoldierID(soldierID);
  if (!benefit) throw createError(404, "Benefits not found for this soldier");
  return benefit;
}

export async function updateBenefit(soldierID, data) {
  const benefit = await benfitsRepo.getBenfitsBySoldierID(soldierID);
  if (!benefit) throw createError(404, "Benefits not found for this soldier");

  const decisionDate = data.decisionDate || new Date();

  const history = benefit.history.map((entry) =>
    entry.endDate === null ? { ...entry, endDate: decisionDate } : entry
  );

  history.push({
    startDate: decisionDate,
    endDate: null,
    decisionReason: data.decisionReason,
    benfitType: data.benefitType,
    details: data.details,
  });

  const updated = await benfitsRepo.updateBenfit(soldierID, {
    currentBenfitType: data.benefitType,
    history,
  });

  return updated;
}
