/* eslint-disable react/style-prop-object */
//@ts-nocheck
import { Box, Flex, Grid, Image, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FaShare } from "react-icons/fa";
import { RiBookmarkFill } from "react-icons/ri";
import { getPostById } from "../../api";
import Container from "../../components/common/Container";
import FixedElement from "../../components/common/FixedElement";
import Loading from "../../components/common/Loading";
import StyledBox from "../../components/common/StyledBox";
import CommunityTeaser from "../../components/community/CommunityTeaser";
import Date from "../../components/posts/Date";
import { PostButton } from "../../components/posts/PostButton";
import PostedBy from "../../components/posts/PostedBy";
import Votes from "../../components/posts/Votes";
import { UserContext } from "../../context/UserContext";
import { PostType } from "../../types";

export default function PostPage({ match }: { match: any }) {
  const [post, setPost] = useState<PostType | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useContext(UserContext);

  const toast = useToast();
  const id = match.params.id;

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    if (post) document.title = post.title;
  }, [post]);

  const fetchPost = async () => {
    setLoading(true);
    const response = await getPostById(id);
    if (response.statusText === "OK") {
      setPost(response.data);
    } else {
      toast({
        status: "error",
        title: "Error fetching post",
      });
    }
    setLoading(false);
  };

  if (loading) return <Loading />;
  return (
    <Container mx="10%">
      <Grid gridTemplateColumns="1fr .4fr" gridGap={5}>
        {post && (
          <>
            <StyledBox display="flex">
              <Votes user={user} post={post} />
              <Box w="100%">
                <Flex justifyContent="space-between">
                  <PostedBy post={post} />
                  <Date post={post} />
                </Flex>
                <Text my={3} fontSize={40} fontWeight="bold">
                  {post.title}
                </Text>
                <Text
                  fontSize={15}
                  dangerouslySetInnerHTML={{ __html: post.body }}
                ></Text>
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
            <FixedElement>
              <CommunityTeaser community={post.postedTo} user={user} />
            </FixedElement>
          </>
        )}
      </Grid>
    </Container>
  );
}
