const Joi = require("joi");

const createTransactionSchema = Joi.object({
  categoryId: Joi.string().required(),

  amount: Joi.number().positive().required(),

  type: Joi.string().valid("income", "expense").required(),

  description: Joi.string().trim().allow("").optional(),

  transactionDate: Joi.date().required(),
});

module.exports = {
  createTransactionSchema,
  updateTransactionSchema: createTransactionSchema,
};
