import { useEffect, useState } from "react";
import { Pokemon as PokemonModel } from "../models/pokemon";
import { fetchPokemons } from "../api/pokemons_api";
import PokemonLoggedOutView from "./PokemonLoggedOutView";
import { Grid, Spinner } from "@chakra-ui/react";

const PokemonsPageLoggedOutView = () => {
  const [pokemons, setPokemons] = useState<PokemonModel[]>([]);
  const [pokemonsLoading, setPokemonsLoading] = useState(true);
  const [showPokemonsLoadingError, setShowPokemonsLoadingError] =
    useState(false);

  useEffect(() => {
    async function loadPokemons() {
      try {
        setShowPokemonsLoadingError(false);
        setPokemonsLoading(true);
        const pokemons = await fetchPokemons();
        setPokemons(pokemons);
      } catch (error) {
        console.error(error);
        setShowPokemonsLoadingError(true);
      } finally {
        setPokemonsLoading(false);
      }
    }

    loadPokemons();
  }, []);

  const pokemonsGrid = (
    <Grid
      mt={5}
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={6}
      maxW="1200px"
      w="100%"
    >
      {pokemons.map((pokemon) => (
        <PokemonLoggedOutView pokemon={pokemon} key={pokemon._id} />
      ))}
    </Grid>
  );

  return (
    <>
      <div>
        Please login to create, view and edit, and delete your own pokemon.
      </div>
      {pokemonsLoading && <Spinner size="xl" />}
      {showPokemonsLoadingError && (
        <p>Something went wrong. Please try again.</p>
      )}
      {!pokemonsLoading && !showPokemonsLoadingError && (
        <>{pokemons.length > 0 ? pokemonsGrid : <p>No pokemons to show.</p>}</>
      )}
    </>
  );
};

export default PokemonsPageLoggedOutView;
