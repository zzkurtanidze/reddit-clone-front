//@ts-nocheck
import { Box, Flex, Image, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { getPostById } from "../../api";
import Container from "../../components/common/Container";
import Loading from "../../components/common/Loading";
import CommunityInfo from "../../components/community/CommunityInfo";
import Date from "../../components/posts/Date";
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
      <Flex gridGap={10}>
        {post && (
          <>
            <Flex
              bg="gray.100"
              borderRadius="4px"
              p="15px"
              borderWidth="1px"
              borderColor="gray.300"
            >
              <Votes user={user} post={post} />
              <Box>
                <Flex justifyContent="space-between">
                  <PostedBy post={post} />
                  <Date post={post} />
                </Flex>
                <Text fontSize={40} fontWeight="bold">
                  {post.title}
                </Text>
                <Text
                  fontSize={15}
                  dangerouslySetInnerHTML={{ __html: post.body }}
                ></Text>
                {post.image && (
                  <Image src={`http://${post.image}`} alt={post.title} mt={5} />
                )}
              </Box>
            </Flex>
            <CommunityInfo community={post?.postedTo} user={user} />
          </>
        )}
      </Flex>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </Container>
  );
}
