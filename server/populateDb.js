const mongoose = require("mongoose");
const axios = require("axios");
const Pokemon = require("./models/Pokemon");
const Type = require("./models/Type");
const Ability = require("./models/Ability");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

if (!userArgs[0]) {
  console.error("Please provide a MongoDB URL as the first argument.");
  process.exit(1);
}

const mongoDB = userArgs[0];

async function main() {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    await populateTypesAndAbilities();
    await populatePokemons();

    console.log("Closing connection");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

async function fetchPokemonData(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await axios.get(url);
  const data = response.data;

  const name = data.name;
  const imgUrl = data.sprites.front_default;
  const types = await Promise.all(
    data.types.map(async (typeInfo) => {
      const type = await Type.findOneAndUpdate(
        { name: typeInfo.type.name },
        { name: typeInfo.type.name },
        { upsert: true, new: true }
      );
      return type._id;
    })
  );
  const abilities = await Promise.all(
    data.abilities.map(async (abilityInfo) => {
      const ability = await Ability.findOneAndUpdate(
        { name: abilityInfo.ability.name },
        { name: abilityInfo.ability.name },
        { upsert: true, new: true }
      );
      return ability._id;
    })
  );

  return { name, imgUrl, types, abilities };
}

async function populateTypesAndAbilities() {
  console.log("Populating Types and Abilities");

  // Fetch a single Pokémon to get the types and abilities
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon/1");
  const types = response.data.types.map((typeInfo) => typeInfo.type.name);
  const abilities = response.data.abilities.map(
    (abilityInfo) => abilityInfo.ability.name
  );

  // Create unique types and abilities in their respective collections
  await Promise.all(
    types.map(async (type) => {
      await Type.findOneAndUpdate(
        { name: type },
        { name: type },
        { upsert: true, new: true }
      );
    })
  );

  await Promise.all(
    abilities.map(async (ability) => {
      await Ability.findOneAndUpdate(
        { name: ability },
        { name: ability },
        { upsert: true, new: true }
      );
    })
  );
}

async function populatePokemons() {
  console.log("Populating Pokemons");

  const promises = [];

  for (let i = 1; i <= 151; i++) {
    promises.push(fetchPokemonData(i));
  }

  const pokemons = await Promise.all(promises);

  await Pokemon.insertMany(pokemons);
  console.log("Inserted 151 Pokemons");
}

main().catch((err) => console.log(err));
