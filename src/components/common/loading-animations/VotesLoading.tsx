import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { ImArrowDown, ImArrowUp } from "react-icons/im";

export default function VotesLoading() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      position="relative"
      gridGap="5px"
      overflow="hidden"
      w="30px"
      p={0}
      id="wrapper"
    >
      <Button px={0} py={2} h="max-content" name="like" bg="transparent">
        <ImArrowUp name="like" size={14} color="gray" />
      </Button>
      <Box w="14px" h="22px" id="animate"></Box>
      <Button
        px={0}
        py={2}
        w="max-content"
        h="max-content"
        borderRadius={5}
        bg="transparent"
        name="unlike"
      >
        <ImArrowDown size={14} color="gray" />
      </Button>
    </Flex>
  );
}
