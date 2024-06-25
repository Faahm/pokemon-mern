import { Box } from "@chakra-ui/react";
import PokemonsPageLoggedInView from "../components/PokemonsPageLoggedInView";
import PokemonsPageLoggedOutView from "../components/PokemonsPageLoggedOutView";
import { User } from "../models/user";

interface PokemonsPageProps {
  loggedInUser: User | null;
}

const PokemonsPage = ({ loggedInUser }: PokemonsPageProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      p={10}
    >
      <>
        {loggedInUser ? (
          <PokemonsPageLoggedInView />
        ) : (
          <PokemonsPageLoggedOutView />
        )}
      </>
    </Box>
  );
};

export default PokemonsPage;
