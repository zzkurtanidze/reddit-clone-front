import { Flex, Link, Text } from "@chakra-ui/layout";
//@ts-ignore
import { PostType } from "@types/";
import React, { useEffect, useState } from "react";
import { HiExternalLink } from "react-icons/hi";

export default function DefaultLink({ post }: { post: PostType }) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const { host } = new URL(post.url);
    setUrl(host);
  }, []);

  return (
    <Link
      w="max-content"
      h="max-content"
      fontSize={10}
      color="blue.500"
      href={post.url}
      _focus={{}}
    >
      <Flex>
        <Text textOverflow="ellipsis" maxW="250px" noOfLines={1}>
          {url}
        </Text>
        <HiExternalLink size={12} />
      </Flex>
    </Link>
  );
}
