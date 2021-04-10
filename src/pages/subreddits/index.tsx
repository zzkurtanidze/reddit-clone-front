//@ts-ignore
import { getCategories } from "@api/";
import { Flex, Text } from "@chakra-ui/layout";
import Categories from "@components/Categories";
import Container from "@components/common/Container";
import TrendingCommunities from "@components/community/trending/TrendingCommunities";
import SubredditList from "@components/SubredditList";
import React from "react";

export default function SubredditsPage({ match }: { match: any }) {
  const categoryName = match.params.categoryName || undefined;
  const { categories } = getCategories();

  return (
    <>
      <Flex
        direction="column"
        justifyContent="center"
        position="relative"
        top="60px"
        bg="white"
        px="10%"
        py="2%"
        fontFamily="mono"
      >
        <Text fontSize={22} fontWeight="medium">
          Today's Top Growing Communities
        </Text>
        <Text fontSize={13} color="gray.500">
          Browse Reddit's top growing communities. Find the top communities in
          your favorite category.
        </Text>
      </Flex>

      <Container
        mx="13%"
        display="grid"
        gridTemplateColumns="0.3fr 1fr .5fr "
        gridGap={5}
      >
        <Categories categories={categories} selectedCategory={categoryName} />
        <SubredditList category={categoryName} />
        <TrendingCommunities category={categories && categories[1]} />
      </Container>
    </>
  );
}
