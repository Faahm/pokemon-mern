import React, { useEffect, useState } from "react";
import { Pokemon as PokemonModel } from "./models/pokemon";
import Pokemon from "./components/Pokemon";
import { Box, Grid, Spinner, Button } from "@chakra-ui/react";
import { fetchPokemons, deletePokemon } from "./api/pokemons_api";
import CreateEditPokemonModal from "./components/CreateEditPokemonModal";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";

function App() {
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

  async function handleDeletePokemon(pokemon: PokemonModel) {
    try {
      await deletePokemon(pokemon._id);
      setPokemons(
        pokemons.filter(
          (existingPokemon) => existingPokemon._id !== pokemon._id
        )
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

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
        <Pokemon
          pokemon={pokemon}
          onDeletePokemonClicked={handleDeletePokemon}
          key={pokemon._id}
        />
      ))}
    </Grid>
  );

  return (
    <>
      <NavBar
        loggedInUser={null}
        onLoginClicked={() => {}}
        onRegisterClicked={() => {}}
        onLogoutSuccessful={() => {}}
      />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        p={10}
      >
        {pokemonsLoading && <Spinner size="xl" />}
        {showPokemonsLoadingError && (
          <p>Something went wrong. Please try again.</p>
        )}
        {!pokemonsLoading && !showPokemonsLoadingError && (
          <>
            {pokemons.length > 0 ? (
              pokemonsGrid
            ) : (
              <p>You don't own any pokemon</p>
            )}
          </>
        )}
      </Box>
    </>
  );
}

export default App;
