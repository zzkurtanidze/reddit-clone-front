//@ts-nocheck
import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import { getUser, getUserRole } from "./api/index";
import { UserContext } from "./context/UserContext";
import { UserRoleContext } from "./context/UserRoleContext";
import UserPage from "./pages/user";
import Loading from "./components/common/Loading";
import SubmitPage from "./pages/submit";
import { Fonts } from "./Fonts";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PostPage from "./pages/post";
import PostDraftsPage from "./pages/submit/drafts";
import CommunityPage from "./pages/community";
import PasswordResetPage from "./pages/password-reset";
import UserSettingsPage from "./pages/user/user-settings";
import SubredditsPage from "@pages/subreddits";
import ModeratorsPage from "@pages/community/moderators";
import SubredditDictionaryPage from "@pages/subreddits/dictionary";
import ModToolsPage from "@pages/community/modtools";

const theme = extendTheme({
  fonts: {
    body: "Noto Sans",
    mono: "IBM Plex Sans",
  },
});

export default function App() {
  const { user, isLoading } = getUser();

  if (isLoading) return <Loading />;
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <UserContext.Provider value={user}>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/submit/drafts" component={PostDraftsPage} />
          <ProtectedRoute path="/:name/submit" component={SubmitPage} />
          <ProtectedRoute path="/submit" component={SubmitPage} />
          <ProtectedRoute path="/settings/:tab" component={UserSettingsPage} />
          <Route
            path="/subreddits/trending/:categoryName"
            component={SubredditsPage}
          />
          <Route path="/subreddits/trending" component={SubredditsPage} />
          <Route
            path="/subreddits/:letter"
            component={SubredditDictionaryPage}
          />
          <Route path="/resetpassword/:token" component={PasswordResetPage} />
          <Route path="/r/:name/about/:tabname" component={ModToolsPage} />
          <Route path="/r/:name/about/moderators" component={ModeratorsPage} />
          <Route path="/r/:name" component={CommunityPage} />
          <Route path="/user/:username" component={UserPage} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </UserContext.Provider>
    </ChakraProvider>
  );
}
