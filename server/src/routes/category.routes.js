const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");
const authenticate = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { createCategorySchema } = require("../validators/category.validator");
const { updateCategorySchema } = require("../validators/category.validator");

router.post(
  "/",
  authenticate,
  validate(createCategorySchema),
  categoryController.createCategory,
);

router.get("/", authenticate, categoryController.getCategories);

router.put(
  "/:id",
  authenticate,
  validate(updateCategorySchema),
  categoryController.updateCategory,
);

router.delete("/:id", authenticate, categoryController.deleteCategory);

module.exports = router;
