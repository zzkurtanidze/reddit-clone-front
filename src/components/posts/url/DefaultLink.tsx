import { Flex, Link, Text } from "@chakra-ui/layout";
//@ts-ignore
import { PostType } from "@types/";
import React from "react";
import { HiExternalLink } from "react-icons/hi";

export default function DefaultLink({ post }: { post: PostType }) {
  return (
    <Link
      w="max-content"
      h="max-content"
      fontSize={10}
      color="blue.500"
      href={post.url}
    >
      <Flex>
        <Text textOverflow="ellipsis" maxW="250px" noOfLines={1}>
          {post.url}
        </Text>
        <HiExternalLink size={12} />
      </Flex>
    </Link>
  );
}
