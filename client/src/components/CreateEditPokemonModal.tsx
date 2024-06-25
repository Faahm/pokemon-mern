import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Pokemon } from "../models/pokemon";
import { PokemonInput } from "../api/pokemons_api";
import { createPokemon, updatePokemon } from "../api/pokemons_api";

interface CreateEditPokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemonToEdit?: Pokemon;
  onPokemonSaved: (pokemon: Pokemon) => void;
}

function CreateEditPokemonModal({
  isOpen,
  onClose,
  pokemonToEdit,
  onPokemonSaved,
}: CreateEditPokemonModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PokemonInput>({
    defaultValues: {
      name: pokemonToEdit?.name || "",
      imgUrl: pokemonToEdit?.imgUrl || "",
      types: pokemonToEdit?.types?.map((type) => type.name) || [],
      abilities: pokemonToEdit?.abilities?.map((ability) => ability.name) || [],
    },
  });

  async function onSubmit(input: PokemonInput) {
    input.types = input.types.filter((type) => type.trim() !== "");
    input.abilities = input.abilities.filter(
      (ability) => ability.trim() !== ""
    );
    console.log(input);
    try {
      let pokemonResponse: Pokemon;

      if (pokemonToEdit) {
        pokemonResponse = await updatePokemon(pokemonToEdit._id, input);
      } else {
        pokemonResponse = await createPokemon(input);
      }

      onPokemonSaved(pokemonResponse);

      reset();
      onClose();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {pokemonToEdit ? "Edit Pokemon" : "Create Pokemon"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <form id="addEditPokemonForm" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="4">
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" {...register("name")} />
                </FormControl>

                <FormControl id="imgUrl" isRequired>
                  <FormLabel>Image URL</FormLabel>
                  <Input type="text" {...register("imgUrl")} />
                </FormControl>

                <FormControl>
                  <FormLabel>Types</FormLabel>
                  <Stack spacing="3">
                    {pokemonToEdit ? (
                      pokemonToEdit?.types.map((type, index) => (
                        <Input
                          key={index}
                          isRequired
                          type="text"
                          defaultValue={type.name}
                          {...register(`types.${index}`, {
                            required: "At least one type is required",
                          })}
                        />
                      ))
                    ) : (
                      <>
                        <Input
                          isRequired
                          type="text"
                          placeholder="Type 1"
                          {...register("types.0", {
                            required: "At least one type is required",
                          })}
                        />
                        <Input
                          type="text"
                          placeholder="Type 2"
                          {...register("types.1")}
                        />
                      </>
                    )}
                  </Stack>
                  {errors.types && (
                    <FormErrorMessage>
                      {errors.types[0]?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>Abilities</FormLabel>
                  <Stack spacing="3">
                    {pokemonToEdit ? (
                      pokemonToEdit?.abilities.map((ability, index) => (
                        <Input
                          key={index}
                          isRequired
                          type="text"
                          defaultValue={ability.name}
                          {...register(`abilities.${index}`, {
                            required: "At least one ability is required",
                          })}
                        />
                      ))
                    ) : (
                      <>
                        <Input
                          isRequired
                          type="text"
                          placeholder="Ability 1"
                          {...register("abilities.0", {
                            required: "At least one ability is required",
                          })}
                        />
                        <Input
                          type="text"
                          placeholder="Ability 2"
                          {...register("abilities.1")}
                        />
                        <Input
                          type="text"
                          placeholder="Ability 3"
                          {...register("abilities.2")}
                        />
                      </>
                    )}
                  </Stack>
                  {errors.abilities && (
                    <FormErrorMessage>
                      {errors.abilities[0]?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  form="addEditPokemonForm"
                  colorScheme="orange"
                  isLoading={isSubmitting}
                >
                  Save
                </Button>
              </Stack>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CreateEditPokemonModal;
