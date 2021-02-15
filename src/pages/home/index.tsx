import React, { useEffect, useState } from "react";
import PostTeaser from "../../components/posts/PostTeaser";
import Trending from "../../components/posts/Trending";
import TrendingCommunities from "../../components/TrendingCommunities";
import { Box, Grid } from "@chakra-ui/react";
import { getCommunities, getPosts } from "../../api";
import { CommunityType, PostType } from "../../types";
import Loading from "../../components/common/Loading";
import NewPostTeaser from "../../components/post-form/NewPostTeaser";
import Container from "../../components/common/Container";

export default function HomePage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [communities, setCommunities] = useState<CommunityType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPosts();
    fetchCommunities();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const response = await getPosts();
    if (response && response.statusText === "OK") {
      setPosts(response.data);
    } else {
      console.log(response?.data);
    }
    setLoading(false);
  };

  const fetchCommunities = async () => {
    setLoading(true);
    const response = await getCommunities();
    if (response && response.statusText === "OK") {
      setCommunities(response.data);
      console.log(response.data)
    }
    setLoading(false);
  };

  if (loading) return <Loading />;
  return (
    <Container>
      <>
        {posts.length >= 1 && (
          <Trending items={posts.length >= 6 ? posts.slice(0, 4) : posts} />
        )}
        <Grid mt={10} templateColumns="1fr 0.5fr" gap={50}>
          {}
          <Box>
            <NewPostTeaser />
            {posts.length >= 1 &&
              posts.map((item) => <PostTeaser key={item._id} post={item} />)}
          </Box>
          <Box>
            <TrendingCommunities communities={communities} />
          </Box>
        </Grid>
      </>
    </Container>
  );
}
