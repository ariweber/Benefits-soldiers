import express from "express";
import {
  validateBenefitBody,
  validateBenefitUpdateBody,
  validateParams,
} from "../middlewares/soldier.middlewar.js";
import { soldierIDParamsSchema } from "../validations/soldiers.validation.js";
import {
  createBenefitsController,
  getBenefitsController,
  updateBenefitController,
} from "../controllers/soldiers.controller.js";

const router = express.Router();

router.post(
  "/:soldierID/benfits",
  validateParams(soldierIDParamsSchema),
  validateBenefitBody,
  createBenefitsController,
);

router.get(
  "/:soldierID/benfits",
  validateParams(soldierIDParamsSchema),
  getBenefitsController,
);


router.patch(
  "/:soldierID/sepend",
  validateParams(soldierIDParamsSchema),
  validateBenefitUpdateBody,
  updateBenefitController,
);

export default router;
