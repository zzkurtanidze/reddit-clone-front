//@ts-nocheck
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
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

export default function PostTeaser({ post }: { post: PostType }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useContext(UserContext);

  return (
    <Link _hover={{}} _focus={{}} href={`/post/${post._id}`}>
      <StyledBox
        _hover={{ border: "1px solid #898989 " }}
        display="flex"
        mb="20px"
        pl="0"
        pt="0"
        pb="0"
        position="relative"
      >
        <Box bg="#F8F9FA" px="7px" pt="10px" position="relative">
          <Votes user={user} post={post} />
        </Box>
        <Box w="100%" pt="10px" ml="10px">
          <PostedBy post={post} />
          <Text fontWeight="semibold">{post.title}</Text>
          {post.body && (
            <Text
              fontSize={14}
              className="post-body"
              dangerouslySetInnerHTML={{ __html: post.body.slice(0, 220) }}
            ></Text>
          )}
          {post.url && <Url post={post} />}
          {post.image && (
            <Image
              src={post.image}
              mt="10px"
              w="100%"
              maxHeight="400px"
              objectFit="cover"
            />
          )}
          <Flex>
            <PostButton icon={<FaCommentAlt color="gray" />} label="Comment" />
            <PostButton icon={<FaShare color="gray" />} label="Share" />
            <PostButton icon={<RiBookmarkFill color="gray" />} label="Save" />
          </Flex>
        </Box>
        <LoginModal setShowModal={setShowModal} showModal={showModal} />
      </StyledBox>
    </Link>
  );
}
