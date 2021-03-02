//@ts-nocheck
import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React from "react";
import { CommunityType, UserType } from "../../types";
import StyledBox from "../common/StyledBox";
import CommunityPicture from "./CommunityPicture";
import Join from "./Join";

export default function CommunityInfo({
  community,
  user,
}: {
  community: CommunityType;
  user?: UserType;
}) {
  return (
    <StyledBox
      w="100%"
      minWidth="350px"
      textAlign="center"
      maxWidth="max-content"
      h="max-content"
    >
      <Grid placeItems="center">
        {community && (
          <CommunityPicture
            imageSrc={community.image}
            communityName={community.name}
            width="75px"
          />
        )}
      </Grid>
      <Text my="10px" fontSize={16} fontWeight="bold">
        {community.name}
      </Text>
      <Text fontSize={14} fontFamily="sans-serif">
        {community.description}
      </Text>
      <Box textAlign="left" my={5}>
        <Text fontSize={14} fontFamily="sans-serif">
          {community.members.length} Members
        </Text>
        <Text fontSize={14} fontFamily="sans-serif">
          {community.posts.length} Posts
        </Text>
      </Box>
      <Join community={community} user={user} />
    </StyledBox>
  );
}
