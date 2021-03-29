import { Image } from "@chakra-ui/image";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import StyledBox from "./StyledBox";

export default function Rules() {
  return (
    //@ts-ignore
    <StyledBox h="max-content">
      <Flex alignItems="center" gridGap={3} mb="10px">
        <Image
          src="http://localhost:4000/static/reddit-rules.png"
          alt="Reddit-rules"
          w="35px"
        />
        <Text fontWeight="bold" fontSize={15} fontFamily="mono">
          Posting to reddit
        </Text>
      </Flex>
      <Divider />
      <Flex
        direction="column"
        gridGap={2}
        mt="10px"
        fontFamily="mono"
        fontSize={13}
        fontWeight="bold"
      >
        <Text>1. Remember the human</Text>
        <Divider />
        <Text>2. Behave like you would in real life</Text>
        <Divider />
        <Text>3. Look for the original source of content</Text>
        <Divider />
        <Text>4. Search for duplicates before posting</Text>
        <Divider />
        <Text>5. Read the community's ruless</Text>
      </Flex>
    </StyledBox>
  );
}
