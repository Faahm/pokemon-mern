const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  types: [{ type: mongoose.Schema.Types.ObjectId, ref: "Type" }],
  abilities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ability" }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

module.exports = Pokemon;
