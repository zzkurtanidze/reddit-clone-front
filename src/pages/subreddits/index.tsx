//@ts-ignore
import { getCategories } from "@api/";
import { Box, Flex, Text } from "@chakra-ui/layout";
import Categories from "@components/Categories";
import Container from "@components/common/Container";
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
        px="17%"
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

      <Container>
        <Categories categories={categories} selectedCategory={categoryName} />
      </Container>
    </>
  );
}
