/* eslint-disable react-hooks/exhaustive-deps */
//@ts-ignore
import { getCategories } from "@api/";
import { Flex, Text } from "@chakra-ui/layout";
import Categories from "@components/Categories";
import Container from "@components/common/Container";
import CommunitiesDictionary from "@components/community/CommunitiesDictionary";
import TrendingCommunities from "@components/community/trending/TrendingCommunities";
import SubredditList from "@components/SubredditList";
import React, { useEffect, useState } from "react";

export default function SubredditsPage({ match }: { match: any }) {
  const categoryName = match.params.categoryName || undefined;
  const { categories } = getCategories();
  const [randomCategories, setRandomCategories] = useState<number[]>([]);

  useEffect(() => {
    if (categories && randomCategories.length < 1) {
      let firstRandom = Math.floor(Math.random() * categories.length);
      let secondRandom = Math.floor(Math.random() * categories.length);
      if (firstRandom === secondRandom)
        secondRandom = Math.floor(Math.random() * categories.length - 1);

      console.log(firstRandom);
      console.log(secondRandom);

      setRandomCategories([firstRandom, secondRandom]);
    }
  }, [categories]);

  return (
    <>
      <Flex
        direction="column"
        justifyContent="center"
        position="relative"
        top="60px"
        bg="white"
        px="13%"
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
        <Flex direction="column" gridGap={5}>
          <TrendingCommunities
            category={categories && categories[randomCategories[0]]}
          />
          <TrendingCommunities
            category={categories && categories[randomCategories[1]]}
          />
          <CommunitiesDictionary />
        </Flex>
      </Container>
    </>
  );
}
