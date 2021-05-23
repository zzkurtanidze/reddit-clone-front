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
    <StyledBox w="100%" minWidth="350px" maxWidth="max-content" h="max-content">
      <Flex alignItems="center" gridGap={2}>
        {community && (
          <CommunityPicture
            imageSrc={community.image}
            communityUsername={community.username}
            width="50px"
            withLink
          />
        )}
        <Link to={`/r/${community.username}`}>
          <Text my="10px" fontSize={16} fontFamily="mono" fontWeight="bold">
            r/{community.name}
          </Text>
        </Link>
      </Flex>
      <Text fontSize={14} mt={5} fontFamily="mono">
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
        <Join community={community} borderRadius={50} w="100%" user={user} />
      </Flex>
    </StyledBox>
  );
}
