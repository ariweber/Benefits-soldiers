import { benfitsRepo } from "../dal/soldiers.dal.js";
import { createError } from "../utils/createError.js";

export async function createBenefits(soldierID, data) {
  const exists = await benfitsRepo.soldierIsExsits(soldierID);
  if (exists) throw createError(409, "Benefits already exist for this soldier");
  const benefit = {
    unit: data.unit,
    budgetApproved: data.budgetApproved,
    currentBenefitType: data.benefitType,
    history: [
      {
        startDate: data.startDate || new Date(),
        endDate: null,
        decisionReason: data.decisionReason,
        benefitType: data.benefitType,
        details: data.details,
      },
    ],
  };

  const newBenfit = await benfitsRepo.addBenfits(soldierID, benefit);
  return { _id: newBenfit.insertedId, soldierID, ...benefit };
}

export async function getBenefitsBySoldier(soldierID) {
  const benefit = await benfitsRepo.getBenfitsBySoldierID(soldierID);
  if (!benefit) throw createError(404, "Benefits not found");
  return benefit;
}

export async function updateBenefit(soldierID, data) {
  const benefit = await benfitsRepo.getBenfitsBySoldierID(soldierID);
  if (!benefit) throw createError(404, "Benefits not found");

  const decisionDate = data.decisionDate || new Date();

  const history = benefit.history.map((obj) =>
    obj.endDate === null ? { ...obj, endDate: decisionDate } : obj,
  );

  history.push({
    startDate: decisionDate,
    endDate: null,
    decisionReason: data.decisionReason,
    benefitType: data.benefitType,
    details: data.details,
  });

  const updated = await benfitsRepo.updateBenfit(soldierID, {
    currentBenefitType: data.benefitType,
    history,
  });

  return updated;
}
