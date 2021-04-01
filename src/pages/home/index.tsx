import React, { useContext, useEffect, useState } from "react";
import PostTeaser from "@components/posts/PostTeaser";
import Trending from "@components/posts/Trending";
import TrendingCommunities from "@components/community/trending/TrendingCommunities";
import { Box, Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";
//@ts-ignore
import { getPosts } from "@api";
//@ts-ignore
import { PostType } from "@types";
import Loading from "@components/common/Loading";
import NewPostTeaser from "@components/posts/post-form/NewPostTeaser";
import Container from "@components/common/Container";
import { UserContext } from "@context/UserContext";
import FixedElement from "@components/common/FixedElement";
import HomeSidebar from "@components/HomeSidebar";

export default function HomePage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const user = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const response = await getPosts();
    if (response && response.statusText === "OK") {
      setPosts(response.data);
    }
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <Container>
      {posts && (
        <Trending items={posts.length >= 4 ? posts.slice(0, 4) : posts} />
      )}
      <SimpleGrid mt={10} templateColumns="1fr 0.4fr" gap={5}>
        <Box>
          {user && <NewPostTeaser />}
          {posts.length >= 1 ? (
            posts.map((item) => <PostTeaser key={item._id} post={item} />)
          ) : (
            <Box textAlign="center">
              <Text fontWeight="bold" fontSize={20}>
                There are no posts yet.
              </Text>
              <Text fontWeight="light" fontSize={16} mb={10}>
                Try to join in new communities
              </Text>
              <Link
                href="#"
                bg="#1384D7"
                px={5}
                py={3}
                _hover={{}}
                color="white"
                borderRadius={10}
              >
                Explore new communities
              </Link>
            </Box>
          )}
        </Box>
        <FixedElement>
          <Flex flexDirection="column" gridGap={5}>
            <TrendingCommunities />
            {user && <HomeSidebar />}
          </Flex>
        </FixedElement>
      </SimpleGrid>
    </Container>
  );
}
