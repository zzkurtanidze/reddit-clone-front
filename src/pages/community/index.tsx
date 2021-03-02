//@ts-nocheck
import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { getCommunity } from "../../api";
import Container from "../../components/common/Container";
import Cover from "../../components/common/Cover";
import CommunityPicture from "../../components/community/CommunityPicture";
import Join from "../../components/community/Join";
import NewPostTeaser from "../../components/post-form/NewPostTeaser";
import PostTeaser from "../../components/posts/PostTeaser";
import { CommunityType } from "../../types";
import CommunityInfo from "../../components/community/CommunityInfo";
import { UserContext } from "../../context/UserContext";

export default function CommunityPage({ match }: { match: any }) {
  const [community, setCommunity] = useState<CommunityType | undefined>();
  const [coverImage, setCoverImage] = useState<string>("");
  const [communityImage, setCommunityImage] = useState<string | undefined>();
  const [joined, setJoined] = useState<boolean>(false);
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
    const response = await getCommunity(name);
    if (response.statusText === "OK") {
      setCommunity(response.data);
      setCoverImage(
        response.data.coverImage
          ? `http://${response.data.coverImage}`
          : "http://localhost:4000/static/default-cover.png"
      );
      response.data.image
        ? setCommunityImage(response.data.image && `${response.data.image}`)
        : setCommunityImage();
    }
  };

  return (
    <>
      ,
      {community && (
        <Box>
          <Cover coverImage={coverImage} />
          <Container mt={260}>
            <Flex position="relative" top="-80px" gridGap={5}>
              <Box>
                <CommunityPicture
                  imageSrc={communityImage}
                  communityName={community.name}
                />
              </Box>
              <Flex gridGap={5} alignItems="center">
                <Box>
                  <Flex gridGap={5} alignItems="center">
                    <Text fontSize={32} fontWeight="bold">
                      {community.name}
                    </Text>
                    <Join community={community} />
                  </Flex>
                  <Text fontSize={14} fontFamily="mono" fontWeight="light">
                    r/{community.name.split(" ").join("")}
                  </Text>
                </Box>
              </Flex>
            </Flex>
            <Grid gridTemplateColumns="1fr .4fr" gridGap={5}>
              <Box>
                {joined && <NewPostTeaser />}
                {community.posts.map((post) => (
                  <PostTeaser post={post} />
                ))}
              </Box>
              <CommunityInfo community={community} />
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
}
