import { Flex, Text } from "@chakra-ui/react";
import { TrendingCommunity } from "../trending/TrendingCommunity";
import { CommunityType } from "../../../types/index";
import React from "react";
import { getTrendingCommunities } from "../../../api";
import StyledBox from "../../common/StyledBox";

export default function TrendingCommunities() {
  const { communities } = getTrendingCommunities(4);

  return communities && communities.length >= 1 ? (
    <StyledBox>
      <Text fontWeight="bold" fontSize={14}>
        Trending Communities
      </Text>
      <Flex mt="15px" direction="column" gridGap={5}>
        {communities.map((community: CommunityType) => (
          <TrendingCommunity key={community._id} community={community} />
        ))}
      </Flex>
    </StyledBox>
  ) : (
    <></>
  );
}
