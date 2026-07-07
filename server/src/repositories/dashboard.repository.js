const Transaction = require("../models/transaction.model");

const getSummary = async (userId) => {
  return await Transaction.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $group: {
        _id: "$type",

        total: {
          $sum: "$amount",
        },
      },
    },
  ]);
};

const getMonthlySummary = async (userId) => {
  return await Transaction.aggregate([
    {
      $match: {
        userId,
      },
    },

    {
      $group: {
        _id: {
          month: {
            $month: "$transactionDate",
          },

          type: "$type",
        },

        total: {
          $sum: "$amount",
        },
      },
    },

    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);
};

const getCategoryExpenses = async (userId) => {
  return await Transaction.aggregate([
    {
      $match: {
        userId,
        type: "expense",
      },
    },

    {
      $group: {
        _id: "$categoryId",

        total: {
          $sum: "$amount",
        },
      },
    },

    {
      $lookup: {
        from: "categories",

        localField: "_id",

        foreignField: "_id",

        as: "category",
      },
    },

    {
      $unwind: {
        path: "$category",

        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $project: {
        _id: 0,

        category: {
          $ifNull: ["$category.name", "Deleted Category"],
        },

        total: 1,
      },
    },

    {
      $sort: {
        total: -1,
      },
    },
  ]);
};

module.exports = {
  getSummary,
  getMonthlySummary,
  getCategoryExpenses,
};
