import { spendRepo } from "../dal/budget.dal.js";
import { createError } from "../utils/createError.js";

export async function createBudget(data) {
  const existing = await spendRepo.queryBudget({
    unit: data.unit,
    month: data.month,
    benfitType: data.benfitType,
  });
  if (existing.length > 0)
    throw createError(409, "Budget already exists");

  const created = await spendRepo.addBudget(data);
  return created
}



export async function searchBudgets(filters) {
  return spendRepo.queryBudget(filters);
}

export async function getTransactionsByBudgetId(budgetId) {
  const budget = await spendRepo.getBudgetById(budgetId);
  if (!budget) throw createError(404, "Budget not found");
  return spendRepo.getTransactionsBybudGetId(budgetId);
}

export async function spendFromBudget(budgetId, data) {
  const budget = await spendRepo.getBudgetById(budgetId);
  if (!budget) throw createError(404, "Budget not found");

  const transactions = await spendRepo.getTransactionsBybudGetId(budgetId);
  const spentAmount = transactions.reduce((total, record) => total + record.amount, 0);
  const remainingAmount = budget.allocatedAmount - spentAmount;

  if (data.amount > remainingAmount)
    throw createError(409, `Insufficient budget: only ${remainingAmount} remaining`, {
      remainingAmount,
    });

  const created = await spendRepo.addSpend({
    bedgetId: budgetId,
    amount: data.amount,
    reason: data.reason,
  });
  return created;
}
