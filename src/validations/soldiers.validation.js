import { z } from "zod";

export const createBenfitSchema = z.object({
  unut: z.string().trim().min(1),

  benefitType: z.enum(["giftCard","dinigHall"]),

  decisionReason: z.string().trim().min(2),

  bedgetApproved: z.boolean(),
  
  startDat: z.date().optional()
});