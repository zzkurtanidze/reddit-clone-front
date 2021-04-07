//@ts-nocheck
import React, { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import { getUser } from "./api/index";
import { UserContext } from "./context/UserContext";
import UserPage from "./pages/user-page";
import Loading from "./components/common/Loading";
import SubmitPage from "./pages/submit-page";
import { Fonts } from "./Fonts";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PostPage from "./pages/post-page";
import PostDraftsPage from "./pages/submit-page/drafts";
import CommunityPage from "./pages/community";
import PasswordResetPage from "./pages/password-reset";
import UserSettingsPage from "./pages/user-page/user-settings";

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
          <Route path="/resetpassword/:token" component={PasswordResetPage} />
          <Route path="/r/:name" component={CommunityPage} />
          <Route path="/user/:username" component={UserPage} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </UserContext.Provider>
    </ChakraProvider>
  );
}
