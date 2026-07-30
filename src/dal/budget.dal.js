import { supabase } from "../db/supabase.js";

async function createBudget(budget) {
  const { data, error } = await supabase.from("budget").insert(budget).select();
  if (error) throw error;
  return data;
}

async function getById(id) {
  const { data, error } = await supabase
    .from("budget")
    .select()
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function searchBudget({ unit, month, benfitType } = {}) {
  let query = supabase.from("budget").select("*, spend(amount)");
  if (unit) query = query.eq("unit", unit);
  if (month) query = query.eq("month", month);
  if (benfitType) query = query.eq("benfitType", benfitType);
  const { data, error } = await query;
  if (error) throw error;

  return data.map(({ spend, ...budget }) => {
    const spentAmount = spend.reduce(
      (total, record) => total + record.amount,
      0,
    );
    return {
      ...budget,
      spentAmount,
      remainingAmount: budget.allocatedAmount - spentAmount,
    };
  });
}

async function getTransactionsBybudGetID(id) {
  const { data, error } = await supabase
    .from("spend")
    .select()
    .eq("bedgetId", id);
  if (error) throw error;
  return data;
}

async function createSpend(spend) {
  const { data, error } = await supabase.from("spend").insert(spend).select();
  if (error) throw error;
  return data;
}

export const spendRepo = {
  addBudget: createBudget,
  getBudgetById: getById,
  queryBudget: searchBudget,
  getTransactionsBybudGetId: getTransactionsBybudGetID,
  addSpend: createSpend,
};

