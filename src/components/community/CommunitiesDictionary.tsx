import { Flex, Text } from "@chakra-ui/layout";
import StyledBox from "@components/common/StyledBox";
import React from "react";
import { Link } from "react-router-dom";

export default function CommunitiesDictionary() {
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
    <StyledBox>
      <Text fontFamily="mono" fontSize={14} fontWeight="bold">
        Browse Communties A-Z
      </Text>
      <Flex
        gridGap={1}
        color="blue.400"
        fontSize={13}
        fontWeight="bold"
        flexWrap="wrap"
      >
        {alphabet.map((letter: string) => (
          <Link to={`/subreddits/${letter.toLowerCase()}`}>{letter}</Link>
        ))}
      </Flex>
    </StyledBox>
  );
}
