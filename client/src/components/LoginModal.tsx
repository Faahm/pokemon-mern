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
  Alert,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../api/users_api";
import { login as loginUser } from "../api/users_api";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_errors";

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
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await loginUser(credentials);
      onLoginSuccessful(user);

      onClose();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }

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
          {errorText && <Alert status="error">{errorText}</Alert>}
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
