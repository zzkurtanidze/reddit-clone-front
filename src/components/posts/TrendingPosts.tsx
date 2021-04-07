//@ts-ignore
import { getTrendingPosts } from "@api/";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PostType } from "../../types/index";
import TrendingItem from "./TrendingPost";

import { HiTrendingUp } from "react-icons/hi";

export default function Trending() {
  const [posts, setPosts] = useState<[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await getTrendingPosts();
    if (response.statusText === "OK") {
      setPosts(response.data);
    } else {
    }
  };

  return (
    <Box my="50px">
      {posts.length > 1 && (
        <Text
          fontSize={14}
          display="flex"
          gridGap={1}
          alignItems="center"
          fontWeight="bold"
        >
          <HiTrendingUp size={20} /> Trending today
        </Text>
      )}
      <SimpleGrid my="20px" gap="10px" columns={[2, 2, 3, 4]}>
        {posts &&
          posts.length >= 1 &&
          posts.map((item: PostType) => (
            <TrendingItem key={item._id} item={item} />
          ))}
      </SimpleGrid>
    </Box>
  );
}