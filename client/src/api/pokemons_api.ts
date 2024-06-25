import { Pokemon } from "../models/pokemon";

import { Type as TypeModel } from "../models/type";
import { Ability as AbilityModel } from "../models/ability";
import { fetchData } from "./fetchData";

export async function fetchPokemons(): Promise<Pokemon[]> {
  const response = await fetchData("http://localhost:5000/", {
    method: "GET",
  });
  return response.json();
}

export interface PokemonInput {
  name: string;
  imgUrl: string;
  types: TypeModel[];
  abilities: AbilityModel[];
}

export async function createPokemon(pokemon: PokemonInput): Promise<Pokemon> {
  console.log(JSON.stringify(pokemon));
  const response = await fetchData("http://localhost:5000/pokemons", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokemon),
  });
  return response.json();
}

export async function updatePokemon(
  pokemonId: string,
  pokemon: PokemonInput
): Promise<Pokemon> {
  const response = await fetchData(
    "http://localhost:5000/pokemons/" + pokemonId,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    }
  );
  return response.json();
}

export async function deletePokemon(pokemonId: string) {
  await fetchData("http://localhost:5000/pokemons/" + pokemonId, {
    method: "DELETE",
  });
}
