import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import { getPosts, getUser } from "./api/index";
import { UserContext } from "./context/UserContext";

const theme = extendTheme({
  fonts: {
    body: "Noto Sans",
  },
});

export default function App() {
  const [user, setUser] = React.useState();

  const fetchData = async () => {
    const response = await getUser();
    console.log(response);
    setUser(response.data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={user}>
        <NavBar />
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </UserContext.Provider>
    </ChakraProvider>
  );
}
