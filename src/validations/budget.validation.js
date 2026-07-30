import { z } from "zod";

export const createBudgetSchema = z.object({
  unit: z.string().trim(),
  benfitType: z.enum(["giftCard", "diningHall"]),
  month: z.coerce.date(),
  allocatedAmount: z.coerce.number().int().positive(),
});

export const queryBudgetSchema = z.object({
  unit: z.string().trim().optional(),
  month: z.coerce.date().optional(),
  benfitType: z.string().trim().optional(),
});

export const spendBudgetSchema = z.object({
  amount: z.coerce.number().int().positive(),
  reasson: z.string().trim(),
});
