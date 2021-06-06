/* eslint-disable react/style-prop-object */
//@ts-nocheck
import { Box, Flex, Grid, Image, Text, useToast } from "@chakra-ui/react";
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
import ErrorPage from "@pages/error";
import Flair from "@components/common/Flair";
//@ts-ignore

export default function PostPage({ match }: { match: any }) {
  const user = useContext(UserContext);
  const id = match.params.id;
  const toast = useToast();

  const { post, isLoading, error } = getPostById(id);

  useEffect(() => {
    if (post) document.title = post.title;
  }, [post]);

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

  if (error) return <ErrorPage />;
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
                {post.flair && (
                  <Box my={2}>
                    <Flair flair={post.flair} />
                  </Box>
                )}
                <Flex mt={5} gridGap={5}>
                  <PostButton
                    onClick={handleCopy}
                    icon={<FaShare color="gray" />}
                    label="Share"
                  />
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
