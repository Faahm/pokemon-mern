import React from "react";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { RegisterCredentials } from "../api/users_api";
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
} from "@chakra-ui/react";
import { register as registerUser } from "../api/users_api";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccessful: (user: User) => void;
}

const RegisterModal = ({
  isOpen,
  onClose,
  onRegisterSuccessful,
}: RegisterModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>();

  async function onSubmit(credentials: RegisterCredentials) {
    try {
      const newUser = await registerUser(credentials);
      onRegisterSuccessful(newUser);

      reset();
      onClose();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="4">
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" {...register("username")} />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" {...register("email")} />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...register("password")} />
                </FormControl>

                <Button
                  type="submit"
                  form="registerForm"
                  colorScheme="orange"
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </Stack>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
