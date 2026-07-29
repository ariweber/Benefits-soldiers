import {
  createFirstBenfitSchema,
  benefitUpdate,
  giftCardSChema,
  diningHall,
} from "../validations/soldiers.validation.js";

const detailsSchemas = {
  giftCard: giftCardSChema,
  dinigHall: diningHall,
};

export function validateBenefitBody(req, res, next) {
  const result = createFirstBenfitSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "invalid filds",
    });
  }

  const detailsSchema = detailsSchemas[result.data.benefitType];
  const detailsResult = detailsSchema.safeParse(req.body.details);

  if (!detailsResult.success) {
    return res.status(400).json({
      success: false,
      message: `invalid details for benefit type ${result.data.benefitType}`,
    });
  }

  req.body = { ...result.data, details: detailsResult.data };
  next();
}

export function validateBenefitUpdateBody(req, res, next) {
  const result = benefitUpdate.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "invalid filds",
    });
  }

  const detailsSchema = detailsSchemas[result.data.benefitType];
  const detailsResult = detailsSchema.safeParse(req.body.details);

  if (!detailsResult.success) {
    return res.status(400).json({
      success: false,
      message: `invalid details for benefit type ${result.data.benefitType}`,
    });
  }

  req.body = { ...result.data, details: detailsResult.data };
  next();
}

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "invalid filds",
      });
    }

    req.body = result.data;
    next();
  };
}

export function validateParams(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({ success: false, message: "invalid params" });
    }
    next();
  };
}

