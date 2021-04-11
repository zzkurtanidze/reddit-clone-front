//@ts-nocheck
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { getCommunity } from "@api";
import Container from "@components/common/Container";
import Cover from "@components/common/Cover";
import CommunityPicture from "@components/community/common/CommunityPicture";
import Join from "@components/community/common/Join";
import NewPostTeaser from "@components/posts/post-form/NewPostTeaser";
import PostTeaser from "@components/posts/PostTeaser";
import CommunityInfo from "@components/community/common/CommunityInfo";
import { UserContext } from "@context/UserContext";
import Loading from "@components/common/Loading";
import FixedElement from "@components/common/FixedElement";
import { Link } from "react-router-dom";

export default function CommunityPage({ match }: { match: any }) {
  const [joined, setJoined] = useState<boolean>(false);
  const name: string = match.params.name;
  const user: UserType | undefined = useContext(UserContext);
  const { community, isLoading } = getCommunity(name);

  useEffect(() => {
    if (community) document.title = `r/${community?.name}`;
    if (user?.joined && community) {
      user.joined.forEach((joinedCommunity) => {
        if (joinedCommunity._id === community._id) {
          setJoined(true);
        }
      });
    }
  }, [user, community]);

  if (isLoading) return <Loading />;
  return (
    <>
      ,
      {community && (
        <Box>
          <Cover coverImage={community.coverImage} />
          <Container mx="0" mt={260}>
            <Box bg="white" zIndex={1} position="relative" top="-55px">
              <Flex px="17%" pt="10px" gridGap={3}>
                <CommunityPicture
                  imageSrc={community.image}
                  communityUsername={community.username}
                  position="relative"
                  top="-25px"
                />
                <Flex
                  gridGap={5}
                  position="relative"
                  top="-14px"
                  alignItems="center"
                >
                  <Box>
                    <Flex gridGap={5} alignItems="center">
                      <Text fontSize={28} color="#1c1c1c" fontWeight="bold">
                        {community.name}
                      </Text>
                      <Join community={community} refresh={true} />
                    </Flex>
                    <Text
                      fontSize={14}
                      color="#7c7c7c"
                      fontFamily="mono"
                      fontWeight="medium"
                    >
                      r/{community.username}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Flex
                gridGap={3}
                fontFamily="mono"
                fontWeight="medium"
                fontSize={13}
                mx="17%"
                pb="5px"
              >
                <Text color="gray.500" _hover={{ color: "yellow.400" }}>
                  <Link to={`/r/${community.username}`}>Posts</Link>
                </Text>
                <Text color="gray.500" _hover={{ color: "yellow.400" }}>
                  <Link to={`/r/${community.username}/wiki/rules`}>Rules</Link>
                </Text>
                <Text color="gray.500" _hover={{ color: "yellow.400" }}>
                  <Link to={`/r/${community.username}/wiki/index`}>Wiki</Link>
                </Text>
              </Flex>
            </Box>
            <Container my={-10}>
              <Grid gridTemplateColumns="1fr 0.5fr" gridGap={3}>
                <Box>
                  {joined && <NewPostTeaser community={community.username} />}
                  {community.posts.length >= 1 ? (
                    community.posts.map((post) => <PostTeaser post={post} />)
                  ) : (
                    <Box
                      textAlign="center"
                      fontSize={22}
                      fontWeight="bold"
                      fontFamily="mono"
                      w="100%"
                    >
                      <Text>No posts yet</Text>
                    </Box>
                  )}
                </Box>
                <Box w="300px">
                  <FixedElement>
                    <CommunityInfo community={community} />
                  </FixedElement>
                </Box>
              </Grid>
            </Container>
          </Container>
        </Box>
      )}
    </>
  );
}
