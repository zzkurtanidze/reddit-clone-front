import { Box } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { getUser } from "../../api";
import Loading from "../../components/common/Loading";
import UserDetails from "../../components/user/UserDetails";
import { UserContext } from "../../context/UserContext";
import { UserType } from "../../types";

export default function UserPage({ match }: { match: any }) {
  const id = match.params.id;
  const [user, setUser] = useState<UserType | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    const user = await getUser(id);
    setUser(user);
    setLoading(false);
  };

  if (loading) return <Loading />;
  return <Box>{user && <UserDetails user={user} id={id} />}</Box>;
}
