const express = require("express");
const {
  getPokemons,
  getPokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
} = require("../controllers/pokemons");

const router = express.Router();

router.get("/", getPokemons);

router.get("/:pokemonId", getPokemon);

router.post("/", createPokemon);

router.patch("/:pokemonId", updatePokemon);

router.delete("/:pokemonId", deletePokemon);

module.exports = router;
