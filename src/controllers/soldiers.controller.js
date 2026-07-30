import {
  createBenefits,
  getBenefitsBySoldier,
  updateBenefit,
} from "../services/soldiers.service.js";

export async function createBenefitsController(req, res, next) {
  try {
    const newBenfit = await createBenefits(req.params.soldierID, req.body);
    res.status(201).json({data: newBenfit });
  } catch (error) {
    next(error);
  }
}


export async function getBenefitsController(req, res, next) {
  try {
    const benefit = await getBenefitsBySoldier(req.params.soldierID);
    res.json({ data: benefit });
  } catch (error) {
    next(error);
  }
}

export async function updateBenefitController(req, res, next) {
  try {
    const updated = await updateBenefit(req.params.soldierID, req.body);
    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
}
