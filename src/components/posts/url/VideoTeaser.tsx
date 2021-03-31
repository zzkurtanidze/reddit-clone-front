import { Image } from "@chakra-ui/image";
import { Box, Flex, Link, Text } from "@chakra-ui/layout";
//@ts-ignore
import { PostType } from "@types/";
import React from "react";
import { HiExternalLink } from "react-icons/hi";
import ReactPlayer from "react-player";
import DefaultLink from "./DefaultLink";

export default function VideoTeaser({ post }: { post: PostType }) {
  return (
    <Flex direction="column" minW="100%">
      <DefaultLink post={post} />
      {post.urlData.images[0] && (
        <Link
          href={post.url}
          _active={{}}
          _focus={{}}
          _hover={{}}
          target="_blank"
        >
          <Box marginTop="5px" bg="#eaeaea" position="relative">
            <ReactPlayer url={post.url} />
          </Box>
        </Link>
      )}
    </Flex>
  );
}
