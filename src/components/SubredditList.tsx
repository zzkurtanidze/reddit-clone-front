//@ts-ignore
import { getTrendingCommunities } from "@api/";
import { Image } from "@chakra-ui/image";
import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/layout";
//@ts-ignore
import { CommunityType } from "@types/";
import React from "react";
import { Link } from "react-router-dom";
import FieldLoading from "./common/loading-animations/FieldLoading";
import StyledBox from "./common/StyledBox";
import CommunityPicture from "./community/common/CommunityPicture";

export default function SubredditList({ category }: { category: string }) {
  const { communities, isLoading, error } = getTrendingCommunities({
    category: category !== "all" ? category : undefined,
  });

  return (
    <StyledBox p={0} w="100%" h="max-content">
      <Box bg="gray.100" py={2} px={4}>
        <Text fontSize={17} fontFamily="mono" fontWeight="medium">
          Today's Top Grwoing Communities
        </Text>
      </Box>
      {isLoading && !error && <FieldLoading />}
      {communities
        ? communities.length >= 1 &&
          communities.map((community: CommunityType, index: number) => (
            <Link to={`/r/${community.username}`}>
              <Grid
                px={5}
                py={2}
                templateColumns="0.1fr 0.1fr 2fr"
                alignItems="center"
                gridGap={5}
                fontFamily="mono"
                fontWeight="medium"
              >
                <Text>{index + 1}</Text>
                <CommunityPicture
                  communityUsername={community.username}
                  imageSrc={community.image}
                  width="40px"
                />
                <Text>r/{community.username}</Text>
              </Grid>
              <Divider />
            </Link>
          ))
        : error && (
            <Flex
              alignItems="center"
              fontFamily="mono"
              fontWeight="medium"
              py="20px"
              direction="column"
            >
              <Image
                src="http://localhost:4000/static/reddit-not-found.png"
                w="80px"
              />
              <Text>Communities not found</Text>
            </Flex>
          )}
    </StyledBox>
  );
}
