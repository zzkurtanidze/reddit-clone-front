import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { TrendingCommunity } from "../trending/TrendingCommunity";
import { CommunityType } from "../../../types/index";
import React, { useEffect, useState } from "react";
import { getTrendingCommunities } from "../../../api";
import StyledBox from "../../common/StyledBox";

export default function TrendingCommunities() {
  const [communities, setCommunities] = useState<undefined | CommunityType[]>();

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    const response = await getTrendingCommunities();
    if (response && response.statusText === "OK") {
      setCommunities(response.data);
    }
  };

  return (
    <StyledBox>
      {communities && (
        <>
          <Text fontWeight="bold" fontSize={14}>
            Trending Communities
          </Text>
          <Flex mt="15px" direction="column" gridGap={5}>
            {communities.map((community) => (
              <TrendingCommunity key={community._id} community={community} />
            ))}
          </Flex>
        </>
      )}
    </StyledBox>
  );
}
