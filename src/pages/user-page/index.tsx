//@ts-nocheck
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { getUser } from "../../api";
import Container from "../../components/common/Container";
import Loading from "../../components/common/Loading";
import PostTeaser from "../../components/posts/PostTeaser";
import UserDetails from "../../components/user/UserDetails";
import { PostType, UserType } from "../../types";

export default function UserPage({ match }: { match: any }) {
  const id = match.params.id;
  const [user, setUser] = useState<UserType | undefined>();
  const [posts, setPosts] = useState<PostType | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    const user = await getUser(id);
    if (user.likedPosts) {
      setPosts(user.likedPosts);
    }
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
              {posts && (
                <Text fontSize={32} mb={5} fontFamily="mono" textAlign="right">
                  Liked Posts: {posts && posts.length}
                </Text>
              )}
              {posts?.map((post) => (
                <PostTeaser post={post} />
              ))}
            </Container>
          )}
        </>
      )}
    </Box>
  );
}
