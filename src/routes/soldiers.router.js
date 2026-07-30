import express from "express";
import { validate, validateParams } from "../middlewares/soldier.middleware.js";
import {
  soldierIDParamsSchema,
  createBenefitSchema,
  updateBenefitSchema,
} from "../validations/soldiers.validation.js";
import {
  createBenefitsController,
  getBenefitsController,
  updateBenefitController,
} from "../controllers/soldiers.controller.js";

const router = express.Router();

router.post(
  "/:soldierID/benefits",
  validateParams(soldierIDParamsSchema),
  validate(createBenefitSchema),
  createBenefitsController,
);

router.get(
  "/:soldierID/benefits",
  validateParams(soldierIDParamsSchema),
  getBenefitsController,
);

router.patch(
  "/:soldierID/benefits",
  validateParams(soldierIDParamsSchema),
  validate(updateBenefitSchema),
  updateBenefitController,
);

export default router;
