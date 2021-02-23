import React, { useContext, useEffect, useState } from "react";
import PostTeaser from "../../components/posts/PostTeaser";
import Trending from "../../components/posts/Trending";
import TrendingCommunities from "../../components/community/TrendingCommunities";
import { Box, Grid, Link, Text } from "@chakra-ui/react";
import { getCommunities, getPosts } from "../../api";
import { CommunityType, PostType } from "../../types";
import Loading from "../../components/common/Loading";
import NewPostTeaser from "../../components/post-form/NewPostTeaser";
import Container from "../../components/common/Container";
import { UserContext } from "../../context/UserContext";

export default function HomePage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [communities, setCommunities] = useState<CommunityType[]>([]);
  const user = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchPosts(), fetchCommunities()]);
    setLoading(false);
  };

  const fetchPosts = async () => {
    const response = await getPosts();
    if (response && response.statusText === "OK") {
      setPosts(response.data);
    }
  };

  const fetchCommunities = async () => {
    const response = await getCommunities();
    if (response && response.statusText === "OK") {
      setCommunities(response.data);
    }
  };

  if (loading) return <Loading />;
  return (
    <Container>
      {posts && (
        <Trending items={posts.length >= 4 ? posts.slice(0, 4) : posts} />
      )}
      <Grid mt={10} templateColumns="1fr 0.5fr" gap={5}>
        <Box>
          {user && <NewPostTeaser />}
          {posts.length > 1 ? (
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
        <Box>
          {communities && <TrendingCommunities communities={communities} />}
        </Box>
      </Grid>
    </Container>
  );
}
