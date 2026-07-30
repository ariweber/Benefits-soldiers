const formatIssues = (error) =>
  error.issues.map((issue) => ({
    field: issue.path.join("."),
  }));

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "validation failed",
        errors: formatIssues(result.error),
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
      return res.status(400).json({
        success: false,
        message: "invalid params",
        errors: formatIssues(result.error),
      });
    }

    next();
  };
}
