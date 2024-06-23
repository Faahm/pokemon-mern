import React, { useEffect, useState } from "react";
import { Pokemon as PokemonModel } from "./models/pokemon";
import Pokemon from "./components/Pokemon";
import { Box, Grid } from "@chakra-ui/react";

function App() {
  const [pokemons, setPokemons] = useState<PokemonModel[]>([]);

  useEffect(() => {
    async function loadPokemons() {
      try {
        const response = await fetch("http://localhost:5000/", {
          method: "GET",
        });
        const pokemons = await response.json();
        setPokemons(pokemons);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    loadPokemons();
  }, []);

  return (
    <Box display="flex" justifyContent="center" p={10}>
      <Grid
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
          <Pokemon pokemon={pokemon} key={pokemon._id} />
        ))}
      </Grid>
    </Box>
  );
}

export default App;
