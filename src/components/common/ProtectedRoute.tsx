import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getUser } from "../../api";
import Loading from "./Loading";

export default function ProtectedRoute({
  path,
  component: Component,
  render,
}: {
  path: string;
  component: any;
  render?: Function;
}) {
  const { user, isLoading } = getUser();

  if (isLoading) return <Loading />;
  return (
    <Route
      path={path}
      render={(props) => {
        if (!user) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
        return Component && <Component {...props} />;
      }}
    />
  );
}
