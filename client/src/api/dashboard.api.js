import api from "./axios";

export const getSummary = async () => {
  const response = await api.get("/dashboard/summary");

  return response.data;
};

export const getMonthlySummary = async () => {
  const response = await api.get("/dashboard/monthly");

  return response.data;
};

export const getCategoryExpenses = async () => {
  const response = await api.get("/dashboard/category-expenses");

  return response.data;
};
