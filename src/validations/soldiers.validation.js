import { z } from "zod";
import { ObjectId } from "mongodb";

export const giftCardSChema = z.object({
  cradprovider: z.string(),
  monthlyValue: z.coerce.number().int().positive(),
  validMerchants: z.string().array(),
});

export const diningHall = z.object({
  baseld: z.coerce.number().int().positive(),
  kosherLevel: z.string().trim(),
  mealTimes: z.string().array(),
});

export const soldierIDParamsSchema = z.object({
  soldierID: z.string().refine((id) => ObjectId.isValid(id), {
    message: "soldierID must be a valid ObjectId",
  }),
});

export const createFirstBenfitSchema = z.object({
  unit: z.string().trim().min(1),

  benefitType: z.enum(["giftCard", "dinigHall"]),

  details: z.object(),

  decisionReason: z.string().trim().min(2),

  bedgetApproved: z.boolean(),

  startDat: z.date().optional(),
});

const benefitUpdate = z.object({
  benefitType: z.enum(["giftCard", "dinigHall"]),

  details: z.object(),

  decisionReason: z.string().trim().min(2),

  bedgetApproved: z.boolean(),

  decisionDate: z.date().optional()
});
