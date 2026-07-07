const Transaction = require("../models/transaction.model");

const create = async (transactionData) => {
  const transaction = await Transaction.create(transactionData);

  return await Transaction.findById(transaction._id).populate("categoryId");
};

const getAll = async (userId, filters = {}) => {
  const query = {
    userId,
  };

  // Type filter
  if (filters.type) {
    query.type = filters.type;
  }

  // Category filter
  if (filters.categoryId) {
    query.categoryId = filters.categoryId;
  }

  // Date filter
  if (filters.startDate || filters.endDate) {
    query.transactionDate = {};

    if (filters.startDate) {
      query.transactionDate.$gte = new Date(filters.startDate);
    }

    if (filters.endDate) {
      query.transactionDate.$lte = new Date(filters.endDate);
    }
  }

  // Sorting
  let sortOption = {
    transactionDate: -1,
  };

  if (filters.sort === "oldest") {
    sortOption = {
      transactionDate: 1,
    };
  }

  // Pagination
  const page = Number(filters.page) || 1;

  const limit = Number(filters.limit) || 10;

  const skip = (page - 1) * limit;

  return await Transaction.find(query)
    .populate("categoryId", "name type")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
};

const findById = async (transactionId, userId) => {
  return await Transaction.findOne({
    _id: transactionId,
    userId,
  }).populate("categoryId", "name type");
};

const update = async (transactionId, userId, data) => {
  return await Transaction.findOneAndUpdate(
    {
      _id: transactionId,
      userId,
    },
    data,
    {
      new: true,
    },
  ).populate("categoryId", "name type");
};

const remove = async (transactionId, userId) => {
  return await Transaction.findOneAndDelete({
    _id: transactionId,
    userId,
  });
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};
