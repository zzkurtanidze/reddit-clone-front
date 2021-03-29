//@ts-nocheck
import {
  Box,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { PostType } from "../../types/index";

import { FaCommentAlt, FaShare } from "react-icons/fa";
import { RiBookmarkFill } from "react-icons/ri";

import { UserContext } from "../../context/UserContext";
import LoginModal from "../auth-modals/LoginModal";
import Votes from "./Votes";
import PostedBy from "./PostedBy";
import StyledBox from "../common/StyledBox";
import { PostButton } from "./PostButton";
import Join from "../community/Join";
import Url from "./Url";

export default function PostTeaser({ post }: { post: PostType }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(false);
  const user = useContext(UserContext);

  const bg = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    if (user?.joined) {
      user.joined.forEach((joinedCommunity) => {
        if (joinedCommunity._id === post.postedTo._id) {
          setJoined(true);
        }
      });
    }
  }, [user]);

  return (
    <StyledBox display="flex" mb="20px" position="relative">
      <Votes user={user} post={post} />
      <Box w="100%">
        <PostedBy post={post} />
        <Link _hover={{}} _focus={{}} href={`/post/${post._id}`}>
          <Text fontWeight="semibold">{post.title}</Text>
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
      {!joined && (
        <Box position="absolute" top={3} right={4}>
          <Join icon={true} community={post.postedTo} />
        </Box>
      )}
      <LoginModal setShowModal={setShowModal} showModal={showModal} />
    </StyledBox>
  );
}
