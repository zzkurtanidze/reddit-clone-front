import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
//@ts-ignore
import { PostType } from "@types/";
import React from "react";
import DefaultLink from "./DefaultLink";

export default function ImageTeaser({ post }: { post: PostType }) {
  return (
    <Flex direction="column" minW="100%">
      <DefaultLink post={post} />
      <Image
        src={post.url}
        alt={post.title}
        mt={5}
        w="65%"
        alignSelf="center"
      />
    </Flex>
  );
}
