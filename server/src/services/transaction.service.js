const transactionRepository = require("../repositories/transaction.repository");
const categoryRepository = require("../repositories/category.repository");

const createTransaction = async (userId, transactionData) => {
  const category = await categoryRepository.findById(
    transactionData.categoryId,
    userId,
  );

  if (!category) {
    throw new Error("Category not found");
  }

  if (category.type !== transactionData.type) {
    throw new Error("Category type must match transaction type");
  }

  return await transactionRepository.create({
    ...transactionData,
    userId,
  });
};

const getTransactions = async (userId, filters) => {
  return await transactionRepository.getAll(userId, filters);
};

const getTransactionById = async (transactionId, userId) => {
  const transaction = await transactionRepository.findById(
    transactionId,
    userId,
  );

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return transaction;
};

const updateTransaction = async (transactionId, userId, data) => {
  const transaction = await transactionRepository.findById(
    transactionId,
    userId,
  );

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  const category = await categoryRepository.findById(data.categoryId, userId);

  if (!category) {
    throw new Error("Category not found");
  }

  if (category.type !== data.type) {
    throw new Error("Category type must match transaction type");
  }

  return await transactionRepository.update(transactionId, userId, data);
};

const deleteTransaction = async (transactionId, userId) => {
  const transaction = await transactionRepository.remove(transactionId, userId);

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return transaction;
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
