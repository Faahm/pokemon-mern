import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getLoggedInUser } from "./api/users_api";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import RegisterModal from "./components/RegisterModal";
import { User } from "./models/user";
import NotFoundPage from "./pages/NotFoundPage";
import PokemonsPage from "./pages/PokemonsPage";

function App() {
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await getLoggedInUser();
        setLoggedInUser(user);
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
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

        <Box>
          <Routes>
            <Route
              path="/"
              element={<PokemonsPage loggedInUser={loggedInUser} />}
            />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
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
    </BrowserRouter>
  );
}

export default App;
