import { useState } from "react";
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
  Alert,
} from "@chakra-ui/react";
import { register as registerUser } from "../api/users_api";
import { ConflictError } from "../errors/http_errors";

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
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterCredentials>();

  async function onSubmit(credentials: RegisterCredentials) {
    try {
      const newUser = await registerUser(credentials);
      onRegisterSuccessful(newUser);
      onClose();
    } catch (error) {
      if (error instanceof ConflictError) {
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
        <ModalHeader>Register</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {errorText && <Alert status="error">{errorText}</Alert>}
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
