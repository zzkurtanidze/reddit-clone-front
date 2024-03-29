//@ts-nocheck
import { Box, Flex, Image, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
//@ts-ignore
import { PostType } from "@types";

import { FaCommentAlt, FaShare } from "react-icons/fa";
import { RiBookmarkFill } from "react-icons/ri";

import { UserContext } from "@context/UserContext";
import LoginModal from "../auth-modals/LoginModal";
import Votes from "./Votes";
import PostedBy from "./PostedBy";
import StyledBox from "../common/StyledBox";
import { PostButton } from "./PostButton";
import Url from "./Url";

import { Link } from "react-router-dom";
import Flair from "@components/common/Flair";

export default function PostTeaser({ post }: { post: PostType }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useContext(UserContext);
  const toast = useToast();

  const handleCopy = () => {
    const url = "http://localhost:3000/post/" + post._id;

    navigator.clipboard.writeText(url);

    toast({
      title: "Link copied succesfully.",
      status: "info",
      isClosable: true,
      duration: 2000,
    });
  };

  return (
    <StyledBox
      _hover={{ border: "1px solid #898989 " }}
      w="100%"
      display="flex"
      mb="20px"
      pl="0"
      pt="0"
      pb="0"
      position="relative"
      cursor="pointer"
    >
      <Box bg="#F8F9FA" px="7px" pt="10px" zIndex={2} position="relative">
        <Votes user={user} post={post} />
      </Box>
      <Text
        _hover={{}}
        _focus={{}}
        zIndex={1}
        w="100%"
        h="100%"
        position="absolute"
        top="0"
        left="0"
      >
        <Link to={`/post/${post._id}`}></Link>
      </Text>
      <Box w="100%" pt="10px" ml="10px" zIndex={1}>
        <PostedBy post={post} />
        <Link to={`/post/${post._id}`}>
          <Text zIndex={0} fontWeight="semibold">
            {post.title}
          </Text>
          {post.body && (
            <Text
              fontSize={14}
              className="post-body"
              dangerouslySetInnerHTML={{ __html: post.body.slice(0, 220) }}
            ></Text>
          )}
        </Link>
        {post.url && <Url post={post} />}
        {post.image && (
          <Link to={`/post/${post._id}`}>
            <Image
              src={post.image}
              mt="10px"
              w="100%"
              maxHeight="400px"
              objectFit="cover"
            />
          </Link>
        )}
        {post.flair && (
          <Box my={2}>
            <Flair flair={post.flair} />
          </Box>
        )}
        <Flex>
          <PostButton icon={<FaCommentAlt color="gray" />} label="Comment" />
          <PostButton
            onClick={handleCopy}
            icon={<FaShare color="gray" />}
            label="Share"
          />
          <PostButton icon={<RiBookmarkFill color="gray" />} label="Save" />
        </Flex>
      </Box>
      <LoginModal setShowModal={setShowModal} showModal={showModal} />
    </StyledBox>
  );
}
