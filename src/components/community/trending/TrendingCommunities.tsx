import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { TrendingCommunity } from "../trending/TrendingCommunity";
//@ts-ignore
import { CategoryType, CommunityType } from "@types/index";
import React from "react";
//@ts-ignore
import { getTrendingCommunities } from "@api";
import StyledBox from "../../common/StyledBox";
import { useHistory } from "react-router-dom";

export default function TrendingCommunities({
  category,
}: {
  category?: CategoryType;
}) {
  const {
    communities,
  }: { communities: CommunityType[] } = getTrendingCommunities({
    limit: 4,
    category: category ? category.value : undefined,
  });
  const history = useHistory();

  return communities && communities.length >= 1 ? (
    <StyledBox position="relative" h="max-content">
      {category ? (
        <Box mb="40%">
          <Box top="0" left="0" w="100%" position="absolute" h="100%">
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="50%"
              bgImage={`url(
            ${
              communities[0].image
                ? communities[0].image
                : "http://localhost:4000/static/123.jpg"
            }
          )`}
              boxShadow="inset 0px -25px 50px rgba(0,0,0,.9)"
              bgSize="cover"
            ></Box>
            <Text
              position="absolute"
              fontWeight="bold"
              fontSize={16}
              top="37%"
              left="10px"
              color="white"
              zIndex={1}
              fontFamily="mono"
            >
              Top {category.name} Communities
            </Text>
          </Box>
        </Box>
      ) : (
        <Text fontFamily="mono" fontWeight="bold" fontSize={14}>
          Trending Communities
        </Text>
      )}
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
        onClick={() =>
          history.push(`/subreddits/trending/${category ? category.value : ""}`)
        }
      >
        View All
      </Button>
    </StyledBox>
  ) : (
    <></>
  );
}
