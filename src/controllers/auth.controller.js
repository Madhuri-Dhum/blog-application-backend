const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistration = async (user) => {
  try {
    const userDetails = await checkUserByEmail(user.email);

    if (userDetails) {
      const error = new Error("User already exist");
      error.statusCode = 409;
      throw error;
    }

    const hashPassword = await bcrypt.hash(user.password, 12);

    user.password = hashPassword;

    return User.create(user);
  } catch (error) {
    throw error;
  }
};

const userLogin = async (user) => {
  try {
    const userDetails = await checkUserByEmail(user.email);

    if (!userDetails) {
      const error = new Error("Please signup first");
      error.statusCode = 401;
      throw error;
    }

    const isPasswordEqual = await bcrypt.compare(user.password, userDetails.password, );

    if (!isPasswordEqual) {
      const error = new Error("Password is incorrect");
      error.statusCode = 401;
      throw error;
    }

    const userPayload = {
      id: userDetails.id,
    };

    const token = await jwt.sign(userPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    return {
      name: userDetails.name,
      email: userDetails.email,
      token,
    };
  } catch (error) {
    throw error;
  }
};

const checkUserByEmail = (email) => {
  return User.findOne({ email });
};

module.exports = {
  userRegistration,
  userLogin,
};
