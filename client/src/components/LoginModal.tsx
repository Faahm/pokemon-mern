import React from "react";
import { User } from "../models/user";
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
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../api/users_api";
import { login as loginUser } from "../api/users_api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({
  isOpen,
  onClose,
  onLoginSuccessful,
}: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const newUser = await loginUser(credentials);
      onLoginSuccessful(newUser);

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
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="4">
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" {...register("username")} />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...register("password")} />
                </FormControl>

                <Button
                  type="submit"
                  form="loginForm"
                  colorScheme="orange"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
