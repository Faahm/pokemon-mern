import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import RegisterModal from "./components/RegisterModal";
import { User } from "./models/user";
import { getLoggedInUser } from "./api/users_api";
import { Box } from "@chakra-ui/react";
import PokemonsPageLoggedInView from "./components/PokemonsPageLoggedInView";
import PokemonsPageLoggedOutView from "./components/PokemonsPageLoggedOutView";

function App() {
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => {
          setIsModalLoginOpen(true);
        }}
        onRegisterClicked={() => {
          setIsModalRegisterOpen(true);
        }}
        onLogoutSuccessful={() => {
          setLoggedInUser(null);
        }}
      />

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

      {isModalRegisterOpen && (
        <RegisterModal
          isOpen={true}
          onRegisterSuccessful={(user) => {
            setLoggedInUser(user);
          }}
          onClose={() => {
            setIsModalRegisterOpen(false);
          }}
        />
      )}

      {isModalLoginOpen && (
        <LoginModal
          isOpen={true}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
          }}
          onClose={() => {
            setIsModalLoginOpen(false);
          }}
        />
      )}
    </>
  );
}

export default App;
