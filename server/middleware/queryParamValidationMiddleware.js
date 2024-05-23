const queryParamValidationMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query);

  if (error) {
    const { details } = error;
    const message = details.map((detail) => detail.message).join(",");

    res.status(200).json({ message: message });
  } else {
    next();
  }
};

module.exports = queryParamValidationMiddleware;
