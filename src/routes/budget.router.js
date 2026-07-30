import express from "express";
import {
  createBudgetController,
  searchBudgetsController,
  getTransactionsController,
  spendBudgetController,
} from "../controllers/budget.controller.js";

import {
  validate,
  validateQuery,
  validateParams,
} from "../middlewares/soldier.middleware.js";

import {
  createBudgetSchema,
  queryBudgetSchema,
  spendBudgetSchema,
  budgetIdParamsSchema,
} from "../validations/budget.validation.js";

const router = express.Router();

router.post("/", validate(createBudgetSchema), createBudgetController);

router.get("/", validateQuery(queryBudgetSchema), searchBudgetsController);

router.get(
  "/:budgetId/transactions",
  validateParams(budgetIdParamsSchema),
  getTransactionsController,
);

router.post(
  "/:budgetId/spend",
  validateParams(budgetIdParamsSchema),
  validate(spendBudgetSchema),
  spendBudgetController,
);

export default router;
