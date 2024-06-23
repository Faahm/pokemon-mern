const Pokemon = require("../models/Pokemon");
const Type = require("../models/Type");
const Ability = require("../models/Ability");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");

const getPokemons = async (req, res, next) => {
  try {
    const pokemons = await Pokemon.find().populate("types abilities").exec();

    res.status(200).json(pokemons);
  } catch (error) {
    next(error);
  }
};

const getPokemon = async (req, res, next) => {
  const pokemonId = req.params.pokemonId;
  try {
    if (!mongoose.isValidObjectId(pokemonId)) {
      throw createHttpError(400, "Invalid pokemon id");
    }

    const pokemon = await Pokemon.findById(pokemonId)
      .populate("types abilities")
      .exec();

    if (!pokemon) {
      throw createHttpError(404, "Pokemon not found");
    }

    res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
};

const createPokemon = async (req, res, next) => {
  const { name, imgUrl, types, abilities } = req.body;

  try {
    if (!name || !imgUrl || !types || !abilities) {
      throw createHttpError(400, "All fields are required");
    }

    const typesArray = await Promise.all(
      types.map(async (type) => {
        const existingType = await Type.findOne({ name: type });

        if (existingType) {
          return existingType;
        } else {
          const newType = new Type({ name: type });
          await newType.save();
          return newType;
        }
      })
    );

    const abilitiesArray = await Promise.all(
      abilities.map(async (ability) => {
        const existingAbility = await Ability.findOne({ name: ability });

        if (existingAbility) {
          return existingAbility;
        } else {
          const newAbility = new Ability({ name: ability });
          await newAbility.save();
          return newAbility;
        }
      })
    );

    const newPokemon = await Pokemon.create({
      name,
      imgUrl,
      types: typesArray,
      abilities: abilitiesArray,
    });

    res.status(201).json(newPokemon);
  } catch (error) {
    next(error);
  }
};

const updatePokemon = async (req, res, next) => {
  const pokemonId = req.params.pokemonId;
  const { name, imgUrl, types, abilities } = req.body;

  try {
    if (!mongoose.isValidObjectId(pokemonId)) {
      throw createHttpError(400, "Invalid pokemon id");
    }

    if (!name || !imgUrl || !types.length || !abilities.length) {
      throw createHttpError(400, "All fields are required");
    }

    const typesArray = await Promise.all(
      types.map(async (type) => {
        let existingType = await Type.findOne({ name: type });
        if (!existingType) {
          existingType = new Type({ name: type });
          await existingType.save();
        }
        return existingType;
      })
    );

    const abilitiesArray = await Promise.all(
      abilities.map(async (ability) => {
        let existingAbility = await Ability.findOne({ name: ability });
        if (!existingAbility) {
          existingAbility = new Ability({ name: ability });
          await existingAbility.save();
        }
        return existingAbility;
      })
    );

    const pokemon = await Pokemon.findById(pokemonId)
      .populate("types abilities")
      .exec();

    if (!pokemon) {
      throw createHttpError(404, "Pokemon not found");
    }

    pokemon.name = name;
    pokemon.imgUrl = imgUrl;
    pokemon.types = typesArray;
    pokemon.abilities = abilitiesArray;

    const updatedPokemon = await pokemon.save();

    res.status(200).json(updatedPokemon);
  } catch (error) {
    next(error);
  }
};

const deletePokemon = async (req, res, next) => {
  const pokemonId = req.params.pokemonId;

  try {
    if (!mongoose.isValidObjectId(pokemonId)) {
      throw createHttpError(400, "Invalid pokemon id");
    }

    const pokemon = await Pokemon.findById(pokemonId)
      .populate("types abilities")
      .exec();

    if (!pokemon) {
      throw createHttpError(404, "Pokemon not found");
    }

    await pokemon.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPokemons,
  getPokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
};
