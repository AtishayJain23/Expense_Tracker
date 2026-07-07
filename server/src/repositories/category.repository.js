const Category = require("../models/category.model");

const create = async (categoryData) => {
  return await Category.create(categoryData);
};

const findOne = async (userId, name, type) => {
  return await Category.findOne({
    userId,
    name,
    type,
  });
};

const getAll = async (userId) => {
  return await Category.find({
    userId,
  }).sort({
    createdAt: -1,
  });
};

const findById = async (id, userId) => {
  return await Category.findOne({
    _id: id,
    userId,
  });
};

const update = async (id, userId, data) => {
  return await Category.findOneAndUpdate(
    {
      _id: id,
      userId,
    },
    data,
    {
      new: true,
    },
  );
};

const remove = async (categoryId, userId) => {
  return await Category.findOneAndDelete({
    _id: categoryId,
    userId,
  });
};

module.exports = {
  create,
  findOne,
  getAll,
  findById,
  update,
  remove,
};
