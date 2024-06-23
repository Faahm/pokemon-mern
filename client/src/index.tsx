import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = extendTheme({
  colors: {
    text: {
      900: "#080706",
    },
    primary: {
      900: "#fb912f",
    },
    secondary: {
      900: "#e0b895",
    },
    accent: {
      900: "#e09c61",
    },
    background: {
      900: "#fff8f2",
    },
  },
});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Box bg="background.900" color="text.900">
        <App />
      </Box>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
