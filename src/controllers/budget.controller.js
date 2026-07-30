import {
  createBudget,
  searchBudgets,
  getTransactionsByBudgetId,
  spendFromBudget,
} from "../services/budget.service.js";

export async function createBudgetController(req, res, next) {
  try {
    const newBudget = await createBudget(req.body);
    res.status(201).json({ data: newBudget });
  } catch (error) {
    next(error);
  }
}

export async function searchBudgetsController(req, res, next) {
  try {
    const budgets = await searchBudgets(req.query);
    res.json({ data: budgets });
  } catch (error) {
    next(error);
  }
}

export async function getTransactionsController(req, res, next) {
  try {
    const transactions = await getTransactionsByBudgetId(req.params.budgetId);
    res.json({ data: transactions });
  } catch (error) {
    next(error);
  }
}

export async function spendBudgetController(req, res, next) {
  try {
    const spend = await spendFromBudget(req.params.budgetId, req.body);
    res.status(201).json({ data: spend });
  } catch (error) {
    next(error);
  }
}


