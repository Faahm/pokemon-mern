const express = require("express");
const { getPokemons } = require("../controllers/pokemons");

const router = express.Router();

router.get("/", getPokemons);

module.exports = router;
