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
import { HiExternalLink } from "react-icons/hi";
import { RiBookmarkFill } from "react-icons/ri";

import { UserContext } from "../../context/UserContext";
import LoginModal from "../form-modals/LoginModal";
import Votes from "./Votes";
import PostedBy from "./PostedBy";
import StyledBox from "../common/StyledBox";
import { PostButton } from "./PostButton";
import Join from "../community/Join";

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
        {post.url &&
          (post.urlData.mediaType === "website" ||
          post.urlData.mediaType === "object" ? (
            <Flex direction={"row"} minW="100%" justifyContent="space-between">
              <Link
                w="max-content"
                h="max-content"
                target="_blank"
                fontSize={12}
                _active={{}}
                _focus={{}}
                color="blue.500"
                href={post.url}
              >
                <Flex>
                  <Text textOverflow="ellipsis" maxW="200px" noOfLines={1}>
                    {post.url}
                  </Text>
                  <HiExternalLink size={14} />
                </Flex>
              </Link>
              {post.urlData.images[0] && (
                <Box position="relative">
                  <Link
                    w="max-content"
                    h="max-content"
                    target="_blank"
                    fontSize={12}
                    _active={{}}
                    _focus={{}}
                    color="blue.500"
                    href={post.url}
                  >
                    <Image
                      src={post.urlData.images[0]}
                      alt={post.urlData.title}
                      minW="50px"
                      minH="50px"
                      w="150px"
                      h="auto"
                      maxW={"150px"}
                      maxH={"100px"}
                      objectFit="cover"
                      objectPosition="0 0"
                      position="relative"
                      borderRadius={"7px"}
                      overflow="hidden"
                      border={"1px solid #1384D7"}
                      marginTop={"-50px"}
                    />
                    <Box
                      bg="#1384D7"
                      p={0.5}
                      position="absolute"
                      bottom="0"
                      right="0"
                      borderEndEndRadius="7px"
                      borderStartStartRadius="5px"
                    >
                      <HiExternalLink color="white" size={12} />
                    </Box>
                  </Link>
                </Box>
              )}
            </Flex>
          ) : (
            <Flex direction="column" minW="100%">
              <Link
                w="max-content"
                h="max-content"
                fontSize={12}
                color="blue.500"
                href={post.url}
              >
                <Flex>
                  <Text textOverflow="ellipsis" maxW="200px" noOfLines={1}>
                    {post.url}
                  </Text>
                  <HiExternalLink size={14} />
                </Flex>
              </Link>
              {post.urlData.images[0] && (
                <Box position="relative">
                  <Image
                    src={post.urlData.images[0]}
                    alt={post.urlData.title}
                    w="100%"
                    h="auto"
                    position="relative"
                    overflow="hidden"
                  />
                </Box>
              )}
            </Flex>
          ))}
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
        <Box position="absolute" top={5} right={5}>
          <Join icon={true} community={post.postedTo} />
        </Box>
      )}
      <LoginModal setShowModal={setShowModal} showModal={showModal} />
    </StyledBox>
  );
}
