const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().trim().required(),

  type: Joi.string().valid("income", "expense").required(),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().trim().required(),

  type: Joi.string().valid("income", "expense").required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
