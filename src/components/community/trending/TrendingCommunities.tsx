import { Button, Flex, Text } from "@chakra-ui/react";
import { TrendingCommunity } from "../trending/TrendingCommunity";
import { CommunityType } from "../../../types/index";
import React from "react";
import { getTrendingCommunities } from "../../../api";
import StyledBox from "../../common/StyledBox";
import { useHistory } from "react-router-dom";

export default function TrendingCommunities() {
  const { communities } = getTrendingCommunities({ limit: 4 });
  const history = useHistory();

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
      <Button
        _hover={{}}
        _active={{}}
        fontSize={15}
        bg="#0079D3"
        color="white"
        fontFamily="mono"
        borderRadius={50}
        w="100%"
        py={2}
        h="max-content"
        mt={4}
        onClick={() => history.push("/subreddits/trending")}
      >
        More trending communities
      </Button>
    </StyledBox>
  ) : (
    <></>
  );
}
