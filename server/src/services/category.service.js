const categoryRepository = require("../repositories/category.repository");

const createCategory = async (userId, categoryData) => {
  const existingCategory = await categoryRepository.findOne(
    userId,
    categoryData.name,
    categoryData.type,
  );

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  return await categoryRepository.create({
    ...categoryData,
    userId,
  });
};

const getCategories = async (userId) => {
  return await categoryRepository.getAll(userId);
};

const updateCategory = async (categoryId, userId, data) => {
  const category = await categoryRepository.findById(categoryId, userId);

  if (!category) {
    throw new Error("Category not found");
  }

  const existingCategory = await categoryRepository.findOne(
    userId,
    data.name,
    data.type,
  );

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  return await categoryRepository.update(categoryId, userId, data);
};

const deleteCategory = async (categoryId, userId) => {
  const category = await categoryRepository.findById(categoryId, userId);

  if (!category) {
    throw new Error("Category not found");
  }

  await categoryRepository.remove(categoryId, userId);
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
