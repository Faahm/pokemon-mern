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
  Wrap,
  WrapItem,
  Badge,
} from "@chakra-ui/react";

interface PokemonProps {
  pokemon: PokemonModel;
}

const Pokemon = ({ pokemon }: PokemonProps) => {
  const { name, imgUrl, types, abilities } = pokemon;

  const capitalizedName = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Card border="1px" borderColor="gray.200" maxW="sm">
      <CardBody>
        <Image
          src={imgUrl}
          alt={`${name}'s image`}
          borderRadius="lg"
          boxSize="150px"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{capitalizedName(name)}</Heading>
          <Divider />
          <Heading size="sm">Types</Heading>
          <Wrap>
            {types.map((type) => (
              <WrapItem key={type._id}>
                <Badge p={1} borderRadius="md" colorScheme="blue">
                  {type.name}
                </Badge>
              </WrapItem>
            ))}
          </Wrap>
          <Divider />
          <Heading size="sm">Abilities</Heading>
          <Wrap>
            {abilities.map((ability) => (
              <WrapItem key={ability._id}>
                <Badge p={1} borderRadius="md" colorScheme="green">
                  {ability.name}
                </Badge>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button colorScheme="orange" variant="solid">
            Details
          </Button>
          <Button colorScheme="red">Delete</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Pokemon;
