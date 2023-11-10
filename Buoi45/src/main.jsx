import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const colors = {
  primary: {
    500: "#319795",
    600: "#2c7a7b",
  },
};

const theme = extendTheme({ colors });
console.log(theme);
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
