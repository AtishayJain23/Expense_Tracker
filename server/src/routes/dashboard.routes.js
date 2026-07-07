const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");
const authenticate = require("../middlewares/auth.middleware");

router.get("/summary", authenticate, dashboardController.getSummary);
router.get("/monthly", authenticate, dashboardController.getMonthlySummary);
router.get("/category-expenses",authenticate,dashboardController.getCategoryExpenses,);

module.exports = router;
