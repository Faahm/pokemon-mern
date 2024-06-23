const mongoose = require("mongoose");

const AbilitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Ability = mongoose.model("Ability", AbilitySchema);

module.exports = Ability;
