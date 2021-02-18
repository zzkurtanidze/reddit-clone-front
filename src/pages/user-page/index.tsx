//@ts-nocheck
import { Box, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUser } from "../../api";
import Container from "../../components/common/Container";
import Loading from "../../components/common/Loading";
import UserDetails from "../../components/user/UserDetails";
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
  return (
    <Box>
      {user && (
        <>
          <UserDetails user={user} id={id} />
          {user.likedPosts && (
            <Container my={0}>
              <Link href={`liked/`} _hover={{ textDecoration: "none" }}>
                Liked Posts: {user.likedPosts.length}
              </Link>
            </Container>
          )}
        </>
      )}
    </Box>
  );
}
