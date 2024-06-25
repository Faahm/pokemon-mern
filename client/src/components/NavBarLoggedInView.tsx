import React from "react";
import { User } from "../models/user";
import { logout as logoutUser } from "../api/users_api";
import { Button, Flex, Text } from "@chakra-ui/react";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await logoutUser();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Flex align="center">
      <Text color="white" mr={4}>
        Signed in as {user.username}
      </Text>
      <Button colorScheme="orange" onClick={logout}>
        Logout
      </Button>
    </Flex>
  );
};

export default NavBarLoggedInView;
