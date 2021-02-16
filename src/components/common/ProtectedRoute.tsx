import React, { useEffect, useState } from "react";
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
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    const response = await getUser();
    if (response) {
      setUser(true);
    }
    setLoading(false);
  };

  if (loading) return <Loading />;
  return (
    <Route
      path={path}
      render={(props) => {
        if (!user) {
          console.log(user);
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
        return Component && <Component props={props} />;
      }}
    />
  );
}
