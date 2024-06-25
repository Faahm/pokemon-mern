import React from "react";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import { Box, Flex, Heading, Link, Spacer } from "@chakra-ui/react";

interface NavBarProps {
  loggedInUser: User | null;
  onRegisterClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

const NavBar = ({
  loggedInUser,
  onRegisterClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavBarProps) => {
  return (
    <Box bg="orange" p={4}>
      <Flex align="center">
        <Heading as="h1" size="lg" color="white">
          <Link href="/">Pokemon MERN</Link>
        </Heading>
        <Spacer />
        {loggedInUser ? (
          <NavBarLoggedInView
            user={loggedInUser}
            onLogoutSuccessful={onLogoutSuccessful}
          />
        ) : (
          <NavBarLoggedOutView
            onLoginClicked={onLoginClicked}
            onRegisterClicked={onRegisterClicked}
          />
        )}
      </Flex>
    </Box>
  );
};

export default NavBar;
