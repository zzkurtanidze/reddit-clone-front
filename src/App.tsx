import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import { getUser } from "./api/index";
import { UserContext } from "./context/UserContext";
import UserPage from "./pages/user-page";

const theme = extendTheme({
  fonts: {
    body: "Noto Sans",
  },
});

export default function App() {
  const [user, setUser] = React.useState();

  const fetchData = async () => {
    const data = await getUser();
    setUser(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={user}>
        <NavBar />
        <Switch>
          <Route path="/user/:id" component={UserPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </UserContext.Provider>
    </ChakraProvider>
  );
}
