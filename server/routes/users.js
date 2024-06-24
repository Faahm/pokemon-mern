const express = require("express");
const { register, login, getAuthUser } = require("../controllers/users");

const router = express.Router();

router.get("/", getAuthUser);

router.post("/register", register);

router.post("/login", login);

module.exports = router;
