const express = require("express");
const {
  register,
  login,
  getAuthUser,
  logout,
} = require("../controllers/users");

const router = express.Router();

router.get("/", getAuthUser);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
