//@ts-nocheck
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { RiMessage2Fill } from "react-icons/ri";
import { getUser } from "@api";
import Container from "@components/common/Container";
import Loading from "@components/common/Loading";
import TabButton from "@components/common/TabButton";
import PostTeaser from "@components/posts/PostTeaser";
import UserDetails from "@components/user/UserDetails";
import { PostType } from "@types";

export default function UserPage({ match }: { match: any }) {
  const username = match.params.username;
  const { user, isLoading } = getUser(username);
  const [likedPosts, setLikedPosts] = useState<PostType[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<PostType[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("liked");

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

  const selectTab = (tabName: string) => {
    setSelectedTab(tabName);
    fetchUser();
  };

  if (isLoading) return <Loading />;
  return (
    <Container>
      <Grid gridGap={5} mt="60px" gridTemplateColumns="1fr 0.4fr">
        {user && (
          <>
            <Text>testing</Text>
            <Box>
              <UserDetails user={user} id={user._id} />
            </Box>
          </>
        )}
      </Grid>
    </Container>
  );
}
