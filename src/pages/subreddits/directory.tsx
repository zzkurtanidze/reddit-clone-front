import { Divider, Flex, Text } from "@chakra-ui/layout";
import Container from "@components/common/Container";
import StyledBox from "@components/common/StyledBox";
import React from "react";
import { Link } from "react-router-dom";

export default function SubredditDirectoryPage({ match }: { match: any }) {
  const letter = match.params.letter;
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "#",
  ];

  return (
    <>
      <Container w="100%" h="100%" mx={0} bg="white" my={0} py="5%" px="17%">
        <Text fontFamily="mono" fontWeight="medium" fontSize={24}>
          Community Directory
        </Text>
        <Flex
          gridGap={1}
          color="blue.400"
          fontSize={15}
          fontWeight="semibold"
          flexWrap="wrap"
        >
          {alphabet.map((letter: string) => (
            <Link to={`/subreddits/${letter.toLowerCase()}`}>{letter}</Link>
          ))}
        </Flex>
      </Container>
      <Container my="2%" fontFamily="mono" fontWeight="medium">
        <StyledBox>
          <Text mb="1rem">
            Browse communities starting with '{letter.toUpperCase()}'
          </Text>
          <Divider />
        </StyledBox>
      </Container>
    </>
  );
}
