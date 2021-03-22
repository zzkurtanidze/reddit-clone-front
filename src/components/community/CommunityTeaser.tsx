//@ts-nocheck
import { Box, Grid, Link, Text } from "@chakra-ui/react";
import React from "react";
import { CommunityType, UserType } from "../../types";
import StyledBox from "../common/StyledBox";
import CommunityPicture from "./CommunityPicture";
import Join from "./Join";

import { FaUserCircle } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";

export default function CommunityTeaser({
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
            communityUsername={community.username}
            width="75px"
            withLink
          />
        )}
      </Grid>
      <Link _hover={{}} _focus={{}} href={`/r/${community.username}`}>
        <Text my="10px" fontSize={22} fontWeight="bold">
          {community.name}
        </Text>
      </Link>
      <Text fontSize={14} fontFamily="mono">
        {community.description}
      </Text>
      <Box textAlign="left" my={5}>
        <Text
          fontSize={14}
          display="flex"
          alignItems="center"
          gridGap={1}
          fontWeight="bold"
          fontFamily="mono"
        >
          <FaUserCircle />
          {community.members.length} Members
        </Text>
        <Text
          fontSize={14}
          display="flex"
          alignItems="center"
          gridGap={1}
          fontWeight="bold"
          fontFamily="mono"
        >
          <RiMessage2Fill />
          {community.posts.length} Posts
        </Text>
      </Box>
      <Join community={community} user={user} />
    </StyledBox>
  );
}
