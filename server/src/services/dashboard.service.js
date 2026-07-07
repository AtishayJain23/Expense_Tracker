const dashboardRepository = require("../repositories/dashboard.repository");

const getSummary = async (userId) => {
  const result = await dashboardRepository.getSummary(userId);

  let totalIncome = 0;
  let totalExpense = 0;

  result.forEach((item) => {
    if (item._id === "income") {
      totalIncome = item.total;
    }

    if (item._id === "expense") {
      totalExpense = item.total;
    }
  });

  return {
    totalIncome,
    totalExpense,

    balance: totalIncome - totalExpense,
  };
};

const getMonthlySummary = async (userId) => {
  const result = await dashboardRepository.getMonthlySummary(userId);

  const monthMap = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const monthlyData = {};

  result.forEach((item) => {
    const month = monthMap[item._id.month];

    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,

        income: 0,

        expense: 0,
      };
    }

    monthlyData[month][item._id.type] = item.total;
  });

  return Object.values(monthlyData);
};

const getCategoryExpenses = async (userId) => {
  return await dashboardRepository.getCategoryExpenses(userId);
};

module.exports = {
  getSummary,
  getMonthlySummary,
  getCategoryExpenses,
};
