import express from "express";
import {
  validateBenefitBody,
  validateParams,
} from "../middlewares/soldier.middlewar.js";
import { soldierIDParamsSchema } from "../validations/soldiers.validation.js";
import {
  createBenefitsController,
  getBenefitsController,
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

router.get("/:soldierID/transactions", (req, res) => {
  res.json();
});

router.patch("/:id/sepend", (req, res) => {
  res.json();
});

export default router;
