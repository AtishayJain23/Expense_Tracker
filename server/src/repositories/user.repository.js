const User = require("../models/user.model");

const create = async (userData) => {
  return await User.create(userData);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByEmailWithPassword = async (email) => {
  return await User.findOne({
    email,
  }).select("+password");
};

// const findById = async (id) => {
//   return await User.findById(id);
// };

const findById = async (id) => {
  return await User.findById(id).select("-password");
};

module.exports = {
  create,
  findByEmail,
  findByEmailWithPassword,
  findById,
};
