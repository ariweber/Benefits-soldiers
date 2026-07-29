import { createBenefits } from "../services/soldiers.servise.js";

export async function createBenefitsController(req, res, next) {
  try {
    const newBenfit = await createBenefits(req.params.soldierID, req.body);
    res.status(201).json({data: newBenfit });
  } catch (error) {
    next(error);
  }
}
