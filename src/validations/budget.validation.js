import { z } from "zod";
import { validMonth } from "../utils/valid.utils.js";

const monthSchema = z
  .string()
  .refine(validMonth, "month must be in YYYY-MM format, e.g. 2026-09");

export const createBudgetSchema = z.object({
  unit: z.string().trim(),
  benfitType: z.enum(["giftCard", "diningHall"]),
  month: monthSchema,
  allocatedAmount: z.coerce.number().positive(),
});

export const queryBudgetSchema = z.object({
  unit: z.string().trim().optional(),
  month: monthSchema.optional(),
  benfitType: z.string().trim().optional(),
});


export const spendBudgetSchema = z.object({
  amount: z.coerce.number().positive(),
  reason: z.string().trim(),
});

export const budgetIdParamsSchema = z.object({
  budgetId: z.coerce.number().int().positive(),
});
