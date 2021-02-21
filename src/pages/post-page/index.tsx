//@ts-nocheck
import { Box, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getPostById } from "../../api";
import Container from "../../components/common/Container";
import Loading from "../../components/common/Loading";
import { PostType } from "../../types";

export default function PostPage({ match }: { match: any }) {
  const [post, setPost] = useState<PostType | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

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
      {post && (
        <Box
          bg="gray.100"
          borderRadius="4px"
          p="15px"
          borderWidth="1px"
          borderColor="gray.300"
        >
          <Text fontSize={40} fontWeight="bold">
            {post.title}
          </Text>
        </Box>
      )}
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </Container>
  );
}
