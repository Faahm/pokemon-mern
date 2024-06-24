const User = require("../models/User");
const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "All fields are required");
    }

    const existingUsername = await User.findOne({ username: username }).exec();

    if (existingUsername) {
      throw createHttpError(409, "Username already taken.");
    }

    const existingEmail = await User.findOne({ email: email }).exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        "This email is already registered. Please log in instead."
      );
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await User.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
