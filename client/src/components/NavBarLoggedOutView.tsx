import React from "react";
import { Button, Flex } from "@chakra-ui/react";

interface NavBarLoggedOutViewProps {
  onRegisterClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = ({
  onRegisterClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <Flex>
      <Button colorScheme="blue" mr={2} onClick={onRegisterClicked}>
        Register
      </Button>
      <Button colorScheme="blue" onClick={onLoginClicked}>
        Login
      </Button>
    </Flex>
  );
};

export default NavBarLoggedOutView;
