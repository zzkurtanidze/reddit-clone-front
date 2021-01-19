import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import NavBar from "./components/NavBar";

const theme = extendTheme({
  fonts: {
    body: "Noto Sans",
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <NavBar />
  </ChakraProvider>
);
