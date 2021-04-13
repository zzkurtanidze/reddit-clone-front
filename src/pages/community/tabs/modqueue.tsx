//@ts-ignore
import { getPostsByCommunity } from "@api/";
import { Checkbox } from "@chakra-ui/checkbox";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import Container from "@components/common/Container";
import PostLoading from "@components/common/loading-animations/PostLoading";
import PostTeaser from "@components/posts/PostTeaser";
//@ts-ignore
import { PostType } from "@types/";
import React from "react";

export default function ModQueueTab({
  communityUsername,
}: {
  communityUsername: string;
}) {
  const { posts, isLoading } = getPostsByCommunity(communityUsername);

  return (
    <Container fontFamily="mono" size="big">
      <Text fontSize={20} fontWeight="medium">
        Mod Queue
      </Text>
      <br />
      <Text fontSize={12} fontWeight="bold" textTransform="uppercase">
        Posts
      </Text>
      <Flex borderRadius={5} alignItems="center" p="10px" w="100%" bg="#F7F9FA">
        <Checkbox bg="white" transform="scale(1.2)" _focus={{}} _active={{}} />
      </Flex>
      <Box bg="white" borderRadius={5} p="5px">
        {isLoading && (
          <>
            <PostLoading />
            <PostLoading />
          </>
        )}
        {posts && posts.length > 0 ? (
          posts.map((post: PostType) => (
            <Flex alignItems="flex-start" gridGap={1}>
              <Checkbox mt={1} />
              <PostTeaser post={post} />
            </Flex>
          ))
        ) : (
          <Flex
            mt={2}
            borderRadius={5}
            bg="white"
            w="100%"
            minH="50vh"
            justifyContent="center"
            alignItems="center"
            direction="column"
            gridGap={2}
            fontFamily="mono"
          >
            <Image src="http://localhost:4000/static/cat_blep.png" w="25%" />
            <Text fontSize={18} fontWeight="semibold">
              The queue is clean!
            </Text>
            <Text fontWeight="medium" fontSize={14} opacity="0.5">
              Kitteh is pleased
            </Text>
          </Flex>
        )}
      </Box>
    </Container>
  );
}
