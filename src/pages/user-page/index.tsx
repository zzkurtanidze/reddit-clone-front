import { Box } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { getUser } from "../../api";
import UserDetails from "../../components/user/UserDetails";
import { UserContext } from "../../context/UserContext";
import { UserType } from "../../types";

export default function UserPage({ match }: { match: any }) {
  const id = match.params.id;
  const [user, setUser] = useState<UserType | undefined>();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const user = await getUser(id);
    setUser(user);
  };

  return <Box>{user && <UserDetails user={user} id={id} />}</Box>;
}
