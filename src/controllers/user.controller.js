const User = require("../models/user.model");

const getUserById = (id) => {
  return User.findById(id).select("-password");
};

const updateUser = (user, userId) => {
  if (user.userId.toString() !== userId) {
    const error = new Error("You don't have access");
    error.statusCode = 403;
    throw error;
  }

  return User.findByIdAndUpdate(userId, user);
};

module.exports = {
  updateUser,
  getUserById,
};
