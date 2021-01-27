import { Box } from "@chakra-ui/react";
import React from "react";
import { PostType } from "../../types/index";
import PostTeaser from "./PostTeaser";

export default function Post({ post }: { post: PostType }) {
  return (
    <Box w="70%" m="auto" mt="50px">
      <PostTeaser post={post} />
    </Box>
  );
}
