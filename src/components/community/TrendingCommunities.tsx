import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { TrendingCommunity } from "./TrendingCommunity";
import { CommunityType } from "../../types/index";
import React, { useEffect, useState } from "react";
import { getCommunities } from "../../api";

export default function TrendingCommunities() {
  const [communities, setCommunities] = useState<undefined | CommunityType[]>();

  const bg = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    const { data } = await getCommunities();
    setCommunities(data);
  };

  return (
    <Box
      borderRadius={5}
      border="1px"
      borderColor="gray.300"
      w="100%"
      h="max-content"
      bg={bg}
      p={15}
    >
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
    </Box>
  );
}
