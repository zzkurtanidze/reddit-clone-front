//@ts-ignore
import { getTrendingCommunities } from "@api/";
import { Box, Divider, Grid, Text } from "@chakra-ui/layout";
//@ts-ignore
import { CommunityType } from "@types/";
import React from "react";
import { Link } from "react-router-dom";
import StyledBox from "./common/StyledBox";
import CommunityPicture from "./community/common/CommunityPicture";

export default function SubredditList() {
  const { communities } = getTrendingCommunities(10000);

  return (
    <StyledBox p={0} w="100%">
      <Box bg="gray.100" py={2} px={4}>
        <Text fontSize={17} fontFamily="mono" fontWeight="medium">
          Today's Top Grwoing Communities
        </Text>
      </Box>
      {communities &&
        communities.length >= 1 &&
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
        ))}
    </StyledBox>
  );
}