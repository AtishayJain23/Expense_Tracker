const dashboardService = require("../services/dashboard.service");

const getSummary = async (req, res) => {
  try {
    const summary = await dashboardService.getSummary(req.user._id);

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMonthlySummary = async (req, res) => {
  try {
    const data = await dashboardService.getMonthlySummary(req.user._id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getCategoryExpenses = async (req, res) => {
  try {
    const data = await dashboardService.getCategoryExpenses(req.user._id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSummary,
  getMonthlySummary,
  getCategoryExpenses,
};
