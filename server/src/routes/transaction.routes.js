const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const transactionController = require("../controllers/transaction.controller");

const {
  createTransactionSchema,
  updateTransactionSchema,
} = require("../validators/transaction.validator");

router.post(
  "/",
  authenticate,
  validate(createTransactionSchema),
  transactionController.createTransaction,
);

router.get("/", authenticate, transactionController.getTransactions);

router.get("/:id", authenticate, transactionController.getTransactionById);

router.patch(
  "/:id",
  authenticate,
  validate(updateTransactionSchema),
  transactionController.updateTransaction,
);

router.delete("/:id", authenticate, transactionController.deleteTransaction);

module.exports = router;
