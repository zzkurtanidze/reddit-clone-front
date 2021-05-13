//@ts-nocheck
import { Box, Grid, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { getUser } from "@api";
import Container from "@components/common/Container";
import Loading from "@components/common/Loading";
import UserDetails from "@components/user/UserDetails";
import { PostType } from "@types";
import { getUserRole } from "@api/";
import { UserRoleContext } from "@context/UserRoleContext";

export default function UserPage({ match }: { match: any }) {
  const username = match.params.username;
  const { user, isLoading } = getUser(username);
  const [likedPosts, setLikedPosts] = useState<PostType[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<PostType[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("liked");
  const role = getUserRole(username);

  useEffect(() => {
    if (user) document.title = `u/${user.username}`;
    fetchUser();
  }, [user]);

  const fetchUser = async () => {
    if (user) {
      if (user.likedPosts) {
        setLikedPosts(user.likedPosts);
      }
      if (user.dislikedPosts) {
        setDislikedPosts(user.dislikedPosts);
      }
    }
  };

  if (isLoading) return <Loading />;
  return (
    <UserRoleContext.Provider value={role}>
      <Box mt="60px" px="17%" py={2} w="100vw" h="40px" bg="white">
        ahaha
      </Box>
      <Container my={7}>
        {user && (
          <Grid gridGap={5} gridTemplateColumns="1fr 0.4fr">
            <Box>
              {user.posts && user.posts.map((post) => <Box>{post.title} </Box>)}
              <Text>testing</Text>
            </Box>
            <Box>
              <UserDetails user={user} id={user._id} />
            </Box>
          </Grid>
        )}
      </Container>
    </UserRoleContext.Provider>
  );
}
