//@ts-nocheck
import {
  Box,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { PostType } from "../../types/index";

import { FaCommentAlt, FaShare } from "react-icons/fa";
import { RiBookmarkFill } from "react-icons/ri";

import { UserContext } from "../../context/UserContext";
import LoginModal from "../form-modals/LoginModal";
import Votes from "./Votes";
import PostedBy from "./PostedBy";
import StyledBox from "../common/StyledBox";
import { PostButton } from "./PostButton";

export default function PostTeaser({ post }: { post: PostType }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useContext(UserContext);

  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <StyledBox display="flex" bg={bg} mb="20px">
      <Votes user={user} post={post} />
      <Box>
        <PostedBy post={post} />

        <Link _hover={{}} _focus={{}} href={`/post/${post._id}`}>
          <Text fontWeight="semibold">{post.title}</Text>
          <Text
            fontSize={14}
            className="post"
            dangerouslySetInnerHTML={{ __html: post.body.slice(0, 220) }}
          ></Text>
        </Link>
        {post.image && (
          <Image
            src={`http://${post.image}`}
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
      <LoginModal setShowModal={setShowModal} showModal={showModal} />
    </StyledBox>
  );
}
