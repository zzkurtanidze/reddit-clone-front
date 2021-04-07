//@ts-nocheck
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { CommunityType, UserType } from "../../types";
import StyledBox from "../common/StyledBox";
import CommunityPicture from "./common/CommunityPicture";
import Join from "./common/Join";

import { FaUserCircle } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";

import { Link } from "react-router-dom";

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
      <Link to={`/r/${community.username}`}>
        <Text my="10px" fontSize={22} fontWeight="bold">
          {community.name}
        </Text>
      </Link>
      <Text fontSize={14} fontFamily="mono">
        {community.description}
      </Text>
      <Flex direction="column" textAlign="left" gridGap={3} my={5} w="100%">
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
        <Join community={community} user={user} borderRadius={5} />
      </Flex>
    </StyledBox>
  );
}
