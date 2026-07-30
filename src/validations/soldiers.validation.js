import { z } from "zod";
import { ObjectId } from "mongodb";

export const giftCardSchema = z.object({
  cardProvider: z.string().trim().min(1),
  monthlyValue: z.coerce.number().int().positive(),
  validMerchants: z.array(z.string()),
});

export const diningHallSchema = z.object({
  baseId: z.string().refine((id) => ObjectId.isValid(id)),
  kosherLevel: z.string().trim().min(1),
  mealTimes: z.array(z.string()),
});

export const soldierIDParamsSchema = z.object({
  soldierID: z.string().refine((id) => ObjectId.isValid(id), {}),
});

const createBase = {
  unit: z.string().trim().min(1),
  decisionReason: z.string().trim().min(2),
  budgetApproved: z.boolean(),
  startDate: z.coerce.date().optional(),
};

export const createBenefitSchema = z.discriminatedUnion("benefitType", [
  z.object({
    ...createBase,
    benefitType: z.literal("giftCard"),
    details: giftCardSchema,
  }),
  z.object({
    ...createBase,
    benefitType: z.literal("diningHall"),
    details: diningHallSchema,
  }),
]);

const updateBase = {
  decisionReason: z.string().trim().min(2),
  budgetApproved: z.boolean(),
  decisionDate: z.coerce.date().optional(),
};

export const updateBenefitSchema = z.discriminatedUnion("benefitType", [
  z.object({
    ...updateBase,
    benefitType: z.literal("giftCard"),
    details: giftCardSchema,
  }),
  z.object({
    ...updateBase,
    benefitType: z.literal("diningHall"),
    details: diningHallSchema,
  }),
]);
