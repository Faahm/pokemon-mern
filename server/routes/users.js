const express = require("express");
const {
  register,
  login,
  getAuthUser,
  logout,
} = require("../controllers/users");
const { requiresAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requiresAuth, getAuthUser);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
