//@ts-nocheck
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import PostTeaser from "../../components/posts/PostTeaser";
import { getUser } from "../../api/index";
import { PostType, UserType } from "../../types";
import Loading from "../../components/common/Loading";
import UserDetails from "../../components/user/UserDetails";
import Container from "../../components/common/Container";
import { Text } from "@chakra-ui/react";

export default function UserLikedPosts({ match }: { match: any }) {
  const id = match.params.id;
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostType[]>();
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    setLoading(true);
    fetchUser();
    setLoading(false);
  }, [posts]);

  const fetchUser = async () => {
    const user = await getUser(id);
    if (user.likedPosts) {
      setPosts(user.likedPosts);
    }
    setUser(user);
  };

  if (loading) return <Loading />;
  return (
    <>
      {user && <UserDetails user={user} id={id} />}
      <Container my={0} position="relative" top="-60px">
        <Text fontSize={32} mb={5} fontFamily="mono" textAlign="right">
          Liked Posts: {posts && posts.length}
        </Text>
        {posts?.map((post) => (
          <PostTeaser post={post} />
        ))}
      </Container>
    </>
  );
}
