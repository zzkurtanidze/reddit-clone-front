import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { PostType } from "../../types";

export default function Date({ post }: { post: PostType }) {
  return (
    <Box>
      <Text fontSize={12} color="gray.500">
        Posted at {post.postedAt}
      </Text>
    </Box>
  );
}
