const { validationResult } = require("express-validator");

const validateParams = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send(result);
  }

  next();
};

export default validateParams;
