import { Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { PostType } from "../../types";

export default function PostedBy({ post }: { post: PostType }) {
  return (
    <Flex fontSize={12}>
      <Link
        fontWeight="bold"
        _focus={{}}
        href={`/r/${post.postedTo.name.split(" ").join("")}`}
      >
        {post.postedTo["name"]}
      </Link>
      <Text color="gray.500" ml="10px">
        Posted By{" "}
        <Link href={`/user/${post.postedBy.username}`} _focus={{}} _active={{}}>
          {post.postedBy.username}
        </Link>
      </Text>
    </Flex>
  );
}
