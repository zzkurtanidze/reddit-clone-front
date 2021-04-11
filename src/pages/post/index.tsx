/* eslint-disable react/style-prop-object */
//@ts-nocheck
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import Url from "@components/posts/Url";
import React, { useContext, useEffect } from "react";
import { FaShare } from "react-icons/fa";
import { RiBookmarkFill } from "react-icons/ri";
//@ts-ignore
import { getPostById } from "@api";
import Container from "@components/common/Container";
import FixedElement from "@components/common/FixedElement";
import Loading from "@components/common/Loading";
import StyledBox from "@components/common/StyledBox";
import CommunityTeaser from "@components/community/CommunityTeaser";
import Date from "@components/posts/Date";
import { PostButton } from "@components/posts/PostButton";
import PostedBy from "@components/posts/PostedBy";
import Votes from "@components/posts/Votes";
import { UserContext } from "@context/UserContext";
//@ts-ignore

export default function PostPage({ match }: { match: any }) {
  const user = useContext(UserContext);
  const id = match.params.id;

  const { post, isLoading, error } = getPostById(id);

  useEffect(() => {
    if (post) document.title = post.title;
  }, [post]);

  if (error)
    return (
      <Flex
        w="100vw"
        h="100vh"
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Image
          src="http://localhost:4000/static/reddit-not-found.png"
          w="100px"
        />
        <Text fontFamily="mono" opacity="0.4" fontWeight="bold" size={24}>
          Sorry, there doesn't seem to be anything here.
        </Text>
      </Flex>
    );
  if (isLoading) return <Loading />;
  return (
    <Container>
      <Grid gridTemplateColumns="1fr .5fr" gridGap={5}>
        {post && (
          <>
            <StyledBox display="flex" pl="0" pt="0" pb="0">
              <Box bg="#F8F9FA" px="7px" pt="10px" position="relative">
                <Votes user={user} post={post} />
              </Box>
              <Box w="100%" pt="10px" ml="10px">
                <Flex alignItems="center" gridGap={2}>
                  <PostedBy post={post} />
                  <Text fontSize={12} color="gray.500">
                    ●
                  </Text>
                  <Date post={post} />
                </Flex>
                <Text my={3} fontSize={28} w="70%" fontWeight="bold">
                  {post.title}
                </Text>
                <Text
                  fontSize={15}
                  dangerouslySetInnerHTML={{ __html: post.body }}
                ></Text>
                <Url post={post} />
                {post.image && (
                  <Image src={post.image} alt={post.title} mt={5} />
                )}
                <Flex mt={5} gridGap={5}>
                  <PostButton icon={<FaShare color="gray" />} label="Share" />
                  <PostButton
                    icon={<RiBookmarkFill color="gray" />}
                    label="Save"
                  />
                </Flex>
                <Box
                  w="100%"
                  h="2px"
                  mt={5}
                  bg="#d3d3d3"
                  overflow="hidden"
                ></Box>
                <Box mt={5}>
                  <Text fontSize={18} fontWeight="bold">
                    Comments
                  </Text>
                  <Text mt={5} textAlign="center">
                    Comments will be added soon
                  </Text>
                </Box>
              </Box>
            </StyledBox>
            <FixedElement scrollY={0}>
              <CommunityTeaser community={post.postedTo} user={user} />
            </FixedElement>
          </>
        )}
      </Grid>
    </Container>
  );
}
