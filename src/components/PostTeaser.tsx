import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import React, { Component } from "react";
import { PostType } from "../types/index";

import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaCommentAlt, FaShare } from "react-icons/fa";
import { RiBookmarkFill } from "react-icons/ri";

export default function PostTeaser({ post }: { post: PostType }) {
  return (
    <Flex
      w="100%"
      h="max-content"
      bg="gray.100"
      borderRadius="4px"
      p="15px"
      borderWidth="1px"
      borderColor="gray.300"
      mb="20px"
    >
      <Flex
        direction="column"
        alignItems="center"
        my="15px"
        mr="15px"
        w="30px"
        gridGap="5px"
      >
        <ImArrowUp color="gray" />
        <Text textAlign="center" fontWeight="bold" fontSize={12}>
          {post.upVotes}
        </Text>
        <ImArrowDown color="gray" />
      </Flex>
      <Box>
        <Flex fontSize={12}>
          <Text fontWeight="bold">{post.postedTo}</Text>{" "}
          <Text color="gray.500" ml="10px">
            Posted By{post.postedBy}
          </Text>
        </Flex>
        <Text>{post.title}</Text>
        <Text>{post.body}</Text>
        {post.image && (
          <Image
            src={post.image}
            mt="10px"
            w="100%"
            maxHeight="500px"
            objectFit="cover"
          />
        )}
        <Flex mt="20px">
          <PostButton icon={<FaCommentAlt color="gray" />} label="Comment" />
          <PostButton icon={<FaShare color="gray" />} label="Share" />
          <PostButton icon={<RiBookmarkFill color="gray" />} label="Save" />
        </Flex>
      </Box>
    </Flex>
  );
}

const PostButton: any = ({
  icon,
  label,
}: {
  icon: Component;
  label: string;
}) => {
  return (
    <Link
      mx="5px"
      px="5px"
      py="2px"
      _hover={{
        backgroundColor: "gray.300",
      }}
    >
      <Flex h="max-content" alignItems="center" fontSize={12} gridGap="5px">
        {icon && icon}
        <Text fontWeight="bold" color="gray.600">
          {label}
        </Text>
      </Flex>
    </Link>
  );
};
