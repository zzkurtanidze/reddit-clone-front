import { Box, Flex } from "@chakra-ui/layout";
//@ts-ignore
import { PostType } from "@types/";
import React from "react";
import ReactPlayer from "react-player";
import DefaultLink from "./DefaultLink";

export default function VideoTeaser({ post }: { post: PostType }) {
  return (
    <Flex direction="column" minW="100%">
      <DefaultLink post={post} />
      {post.urlData && (
        <Box marginTop="5px" position="relative">
          <ReactPlayer controls={true} url={post.url} />
        </Box>
      )}
    </Flex>
  );
}
