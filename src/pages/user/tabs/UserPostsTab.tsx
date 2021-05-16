import { Image } from "@chakra-ui/image";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import StyledBox from "@components/common/StyledBox";
import Date from "@components/posts/Date";
import PostedBy from "@components/posts/PostedBy";
import Votes from "@components/posts/Votes";
//@ts-ignore
import { PostType } from "@types/";
//@ts-ignore
import { UserType } from "@types/";
import React from "react";
import { BsFilePost } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function UserPostsTab({ user }: { user: UserType }) {
  return (
    <Box>
      {user.posts.length > 0 ? (
        user.posts.map((post: PostType) => (
          <StyledBox
            h="max-content"
            _hover={{ border: "1px solid gray" }}
            cursor="pointer"
            px={2}
          >
            <Flex gridGap={2}>
              <Votes post={post} user={user} />
              {post.image ||
              (post.urlData && post.urlData.images && post.urlData.images[0]) ||
              post.url ||
              (post.urlData && post.urlData.favicons[0]) ? (
                <Image
                  src={
                    post.image ||
                    (post.urlData &&
                      post.urlData.images &&
                      post.urlData.images[0]) ||
                    post.url ||
                    (post.urlData && post.urlData.favicons[0])
                  }
                  h="85px"
                  w="120px"
                  objectFit="cover"
                  borderRadius={5}
                />
              ) : (
                <Flex
                  w="120px"
                  h="85px"
                  bg="#F7F7F7"
                  borderRadius={5}
                  alignItems="center"
                  justifyContent="center"
                >
                  <BsFilePost size={27} color="#878A8C" />
                </Flex>
              )}
              <Box fontFamily="mono">
                <Text fontWeight="medium">
                  <Link to={`/post/${post._id}`}>{post.title}</Link>
                </Text>
                <Flex gridGap={1}>
                  <PostedBy post={post} withIcon={false} />
                </Flex>
              </Box>
            </Flex>
          </StyledBox>
        ))
      ) : (
        <Grid placeItems="center" w="100%" h="100%">
          <Text fontSize={22} fontWeight="bold" fontFamily="mono">
            This user has no posts.
          </Text>
        </Grid>
      )}
    </Box>
  );
}
