const ACCOUNT = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const errorMessage = { status: 400 };
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    errorMessage.message = "name and budget are required";
    next(errorMessage);
  } else if (typeof name !== "string") {
    errorMessage.message = "name of account must be a string";
    next(errorMessage);
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    errorMessage.message = "name of account must be between 3 and 100";
    next(errorMessage);
  } else if (typeof budget !== "number") {
    errorMessage.message = "budget of account must be a number";
    next(errorMessage);
  } else if (budget < 0 || budget > 1000000) {
    errorMessage.message = "budget of account is too large or too small";
    next(errorMessage);
  } else {
    next();
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await ACCOUNT.getById(req.params.id);
    if (!account) {
      next({ status: 404, message: "not found" });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }
};
