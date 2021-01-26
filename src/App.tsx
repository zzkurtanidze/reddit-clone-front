import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";

const theme = extendTheme({
  fonts: {
    body: "Noto Sans",
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <NavBar />
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </ChakraProvider>
);
