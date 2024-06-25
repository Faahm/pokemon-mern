import React from "react";
import { Pokemon as PokemonModel } from "../models/pokemon";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Badge,
  Box,
} from "@chakra-ui/react";
import { typeColors } from "../styles/typeColors";

interface PokemonProps {
  setIsModalOpen: any;
  pokemon: PokemonModel;
  onPokemonClicked: (pokemon: PokemonModel) => void;
  onDeletePokemonClicked: (pokemon: PokemonModel) => void;
}

const Pokemon = ({
  pokemon,
  setIsModalOpen,
  onPokemonClicked,
  onDeletePokemonClicked,
}: PokemonProps) => {
  const { name, imgUrl, types, abilities } = pokemon;

  const capitalizedName = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Card maxW="sm">
      <CardBody>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Image
            src={imgUrl}
            alt={`${name}'s image`}
            borderRadius="lg"
            boxSize="150px"
          />
        </Box>
        <Stack mt="6" spacing="3">
          <Heading size="md">{capitalizedName(name)}</Heading>
          <Divider />
          <Heading size="sm">Types</Heading>
          <Stack direction="row">
            {types.map((type) => (
              <Badge
                key={type._id}
                colorScheme={
                  typeColors[type.name as keyof typeof typeColors] || "gray"
                }
              >
                {type.name}
              </Badge>
            ))}
          </Stack>
          <Divider />
          <Heading size="sm">Abilities</Heading>
          <Stack direction="row">
            {abilities.map((ability) => (
              <Badge key={ability._id} colorScheme="gray">
                {ability.name}
              </Badge>
            ))}
          </Stack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="orange"
            onClick={() => {
              onPokemonClicked(pokemon);
              setIsModalOpen(true);
              console.log(pokemon);
            }}
          >
            Edit
          </Button>
          <Button
            colorScheme="red"
            onClick={(e) => {
              onDeletePokemonClicked(pokemon);
              e.stopPropagation();
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Pokemon;
