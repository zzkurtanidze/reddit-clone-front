//@ts-ignore
import { removePostById } from "@api/";
//@ts-ignore
import { getPostsByCommunity } from "@api/";
import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import Container from "@components/common/Container";
import PostLoading from "@components/common/loading-animations/PostLoading";
import PostTeaser from "@components/posts/PostTeaser";
//@ts-ignore
import { PostType } from "@types/";
import React, { useState } from "react";
import { HiTrash } from "react-icons/hi";
import { RiMoreFill, RiStackFill } from "react-icons/ri";

export default function ModQueueTab({
  communityUsername,
}: {
  communityUsername: string;
}) {
  const { posts, isLoading } = getPostsByCommunity(communityUsername);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const toast = useToast();

  const handleChange = (postId: string) => {
    if (selectedPosts.indexOf(postId) > -1) {
      let newSelectedPosts = selectedPosts;
      newSelectedPosts = newSelectedPosts.filter((post) => post !== postId);
      setSelectedPosts(newSelectedPosts);
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPosts.length !== posts.length) {
      let postIds: string[] = [];
      posts.forEach((post: PostType) => {
        postIds.push(post._id);
      });
      setSelectedPosts(postIds);
    } else {
      setSelectedPosts([]);
    }
  };

  const handleRemove = () => {
    selectedPosts.forEach(async (post) => {
      const response = await removePostById(post);
      if (response && response.statusText === "OK") {
        toast({
          title: response.data,
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Container fontFamily="mono" size="norm">
      <Text fontSize={20} fontWeight="medium">
        Mod Queue
      </Text>
      <br />
      <Text fontSize={12} fontWeight="bold" textTransform="uppercase">
        Posts
      </Text>
      <Flex
        borderRadius={5}
        alignItems="center"
        justifyContent="space-between"
        p="10px"
        w="100%"
        bg="#F7F9FA"
        position="relative"
      >
        <Flex alignItems="center" gridGap={4}>
          <Checkbox
            bg="white"
            transform="scale(1.2)"
            onChange={handleSelectAll}
            isChecked={
              posts &&
              posts.length > 0 &&
              posts.length === selectedPosts.length &&
              true
            }
            _focus={{}}
            _active={{}}
          />
          <Box
            w="2px"
            position="absolute"
            left="5%"
            h="36px"
            bg="gray.200"
          ></Box>
          {posts && posts.length > 0 && selectedPosts.length > 0 && (
            <>
              <Button
                color="#878A8C"
                p={1}
                h="max-content"
                bg="transparent"
                fontSize={14}
                gridGap={1}
                onClick={handleRemove}
              >
                <HiTrash color="#878A8C" size={16} />
                Remove
              </Button>
              <Button
                color="#878A8C"
                p={1}
                h="max-content"
                bg="transparent"
                fontSize={14}
                gridGap={1}
              >
                <RiStackFill color="#878A8C" size={16} />
                Spam
              </Button>
              <Button
                color="#878A8C"
                p={1}
                h="max-content"
                bg="transparent"
                fontSize={14}
              >
                <RiMoreFill color="#878A8C" size={16} />
              </Button>
            </>
          )}
        </Flex>
        {posts && posts.length > 0 && (
          <Flex
            gridGap={2}
            fontWeight="bold"
            fontFamily="mono"
            fontSize={12}
            color="gray.500"
          >
            <Text>Items 1-1</Text>
            <Text>•</Text>
            <Text>{selectedPosts.length} Selected</Text>
          </Flex>
        )}
      </Flex>
      <Box bg="white" borderRadius={5} mt={2} p="5px">
        {isLoading && (
          <>
            <PostLoading />
            <PostLoading />
          </>
        )}
        {posts && posts.length > 0 ? (
          posts.map((post: PostType) => (
            <Flex alignItems="flex-start" key={post._id} gridGap={1}>
              <Checkbox
                isChecked={selectedPosts.indexOf(post._id) > -1 && true}
                onChange={() => handleChange(post._id)}
                mt={1}
              />
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
            <Image src="http://localhost:4000/assets/cat_blep.png" w="25%" />
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
