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
import { CommunityType } from "@types";
import CommunityInfo from "@components/community/common/CommunityInfo";
import { UserContext } from "@context/UserContext";
import Loading from "@components/common/Loading";
import FixedElement from "@components/common/FixedElement";

export default function CommunityPage({ match }: { match: any }) {
  const [community, setCommunity] = useState<CommunityType | undefined>();
  const [coverImage, setCoverImage] = useState<string>("");
  const [communityImage, setCommunityImage] = useState<string | undefined>();
  const [joined, setJoined] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const name: string = match.params.name;
  const user: UserType | undefined = useContext(UserContext);

  useEffect(() => {
    fetchCommunity();
  }, []);

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

  const fetchCommunity = async () => {
    setLoading(true);
    const response = await getCommunity(name);
    if (response.statusText === "OK") {
      setCommunity(response.data);
      setCoverImage(
        response.data.coverImage
          ? response.data.coverImage
          : "http://localhost:4000/static/123.jpg"
      );
      response.data.image
        ? setCommunityImage(response.data.image && `${response.data.image}`)
        : setCommunityImage();
    }
    setLoading(false);
  };

  if (loading) return <Loading />;
  return (
    <>
      ,
      {community && (
        <Box>
          <Cover coverImage={coverImage} />
          <Container mt={260}>
            <Flex position="relative" top="-80px" gridGap={5}>
              <CommunityPicture
                imageSrc={communityImage}
                communityUsername={community.username}
              />
              <Flex gridGap={5} alignItems="center">
                <Box>
                  <Flex gridGap={5} alignItems="center">
                    <Text fontSize={32} fontWeight="bold">
                      {community.name}
                    </Text>
                    <Join community={community} refresh={true} />
                  </Flex>
                  <Text fontSize={14} fontFamily="mono" fontWeight="light">
                    r/{community.username}
                  </Text>
                </Box>
              </Flex>
            </Flex>
            <Grid gridTemplateColumns="1fr .5fr" gridGap={5}>
              <Box>
                {joined && <NewPostTeaser />}
                {community.posts.length >= 1 ? (
                  community.posts.map((post) => <PostTeaser post={post} />)
                ) : (
                  <Box
                    textAlign="center"
                    fontSize={22}
                    fontWeight="bold"
                    fontFamily="mono"
                  >
                    <Text>No posts yet</Text>
                  </Box>
                )}
              </Box>
              <FixedElement>
                <CommunityInfo community={community} />
              </FixedElement>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
}
