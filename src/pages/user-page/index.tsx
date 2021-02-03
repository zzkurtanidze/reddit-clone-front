import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import UserDetails from "../../components/user/UserDetails";
import { UserContext } from "../../context/UserContext";

export default function UserPage() {
  const user = useContext(UserContext);

  return <Box>{user && <UserDetails user={user} />}</Box>;
}
