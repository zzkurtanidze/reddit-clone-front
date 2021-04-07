import React, { useContext, useEffect, useState } from "react";
import PostTeaser from "@components/posts/PostTeaser";
import Trending from "@components/posts/TrendingPosts";
import TrendingCommunities from "@components/community/trending/TrendingCommunities";
import { Box, Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";
//@ts-ignore
import { PostType } from "@types";
import Loading from "@components/common/Loading";
import NewPostTeaser from "@components/posts/post-form/NewPostTeaser";
import Container from "@components/common/Container";
import { UserContext } from "@context/UserContext";
import FixedElement from "@components/common/FixedElement";
import HomeSidebar from "@components/HomeSidebar";
import PrimaryButton from "@components/common/PrimaryButton";
import { Waypoint } from "react-waypoint";
//@ts-ignore
import { getPosts } from "@api";

export default function HomePage() {
  const user = useContext(UserContext);
  const { data, isLoading, size, setSize } = getPosts();

  useEffect(() => {
    document.title = `Reddit`;
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <Trending />
      <SimpleGrid mt={10} templateColumns="1fr 0.4fr" gap={5}>
        <Box>
          {user && <NewPostTeaser />}
          {data.map((posts: PostType[]) =>
            posts && posts.length >= 1 ? (
              posts.map((item: PostType, i: number) => (
                <React.Fragment key={i}>
                  <PostTeaser key={item._id} post={item} />
                  {i === posts.length - 3 && (
                    <Waypoint
                      onEnter={() => {
                        setSize(size + 1);
                      }}
                    />
                  )}
                </React.Fragment>
              ))
            ) : (
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize={20}>
                  There are no posts yet.
                </Text>
                <Text fontWeight="light" fontSize={16} mb={10}>
                  Try to join in new communities
                </Text>
                <Link
                  href="#"
                  bg="#1384D7"
                  px={5}
                  py={3}
                  _hover={{}}
                  color="white"
                  borderRadius={10}
                >
                  Explore new communities
                </Link>
              </Box>
            )
          )}
        </Box>
        <FixedElement>
          <Flex flexDirection="column" gridGap={5}>
            <TrendingCommunities />
            {user && <HomeSidebar />}
          </Flex>
        </FixedElement>
        <FixedElement top="0" right="250px">
          <PrimaryButton
            label="Back to top"
            position="absolute"
            bottom="-640px"
            w="max-content"
            borderRadius={50}
            _focus={{}}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </FixedElement>
      </SimpleGrid>
    </Container>
  );
}
