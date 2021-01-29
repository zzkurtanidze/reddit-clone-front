import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { Component, useState } from "react";
import { PostType } from "../../types/index";

import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaCommentAlt, FaShare } from "react-icons/fa";
import { RiBookmarkFill } from "react-icons/ri";

import { likePost } from "../../api/index";

export default function PostTeaser({ post }: { post: PostType }) {
  const [status, setStatus] = useState("");

  const bg = useColorModeValue("gray.100", "gray.900");

  const handleLike = async (e: any) => {
    const name = e.target.name || e.target.parentElement.parentNode.name;
    if (name && post._id) {
      setStatus((status) => (status === name ? "" : name));
      const response = await likePost({ action: name, id: post._id });
      console.log(response);
    }
  };

  return (
    <Flex
      w="100%"
      h="max-content"
      bg={bg}
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
        <Button
          p={0}
          m={0}
          borderRadius={5}
          bg="transparent"
          _focus={{ boxShadow: 0 }}
          name="like"
          onClick={handleLike}
        >
          <ImArrowUp
            name="like"
            color={status === "like" ? `#ff3838` : "gray"}
          />
        </Button>
        <Text textAlign="center" fontWeight="bold" fontSize={12}>
          {post.votes}
        </Text>
        <Button
          p={0}
          m={0}
          borderRadius={5}
          bg="transparent"
          _focus={{ boxShadow: 0 }}
          name="unlike"
          onClick={handleLike}
        >
          <ImArrowDown color={status === "unlike" ? `#ff3838` : "gray"} />
        </Button>
      </Flex>
      <Box>
        <Flex fontSize={12}>
          <Link fontWeight="bold">{post.postedTo["name"]}</Link>{" "}
          <Text color="gray.500" ml="10px">
            Posted By <Link>{post.postedBy.username}</Link>
          </Text>
        </Flex>
        <Text fontWeight="semibold">{post.title}</Text>
        <Text fontSize={14}>{post.body}</Text>
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
      borderRadius={3}
      _hover={{
        backgroundColor: "gray.300",
      }}
    >
      <Flex h="max-content" alignItems="center" fontSize={12} gridGap="5px">
        {icon && icon}
        <Text fontWeight="bold" color="#808080">
          {label}
        </Text>
      </Flex>
    </Link>
  );
};
