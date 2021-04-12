//@ts-ignore
import { getCommunities, getCommunityByLetter } from "@api/";
import { Divider, Flex, Grid, Text } from "@chakra-ui/layout";
import Container from "@components/common/Container";
import StyledBox from "@components/common/StyledBox";
import ErrorPage from "@pages/error";
//@ts-ignore
import { CommunityType } from "@types/";
import React from "react";
import { Link } from "react-router-dom";

export default function SubredditDictionaryPage({ match }: { match: any }) {
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
  let communities;
  if (letter !== "all") {
    let response = getCommunityByLetter(letter);
    communities = response.communities;
  } else {
    let response = getCommunities();
    communities = response.communities;
  }

  return (
    <>
      <Container
        w="100%"
        h="100%"
        mx={0}
        bg="white"
        my={0}
        py="2%"
        mt="50px"
        px="17%"
      >
        <Text fontFamily="mono" fontWeight="medium" fontSize={24}>
          Community Directory
        </Text>
        <Flex
          gridGap={1}
          color="blue.400"
          fontSize={15}
          fontWeight="medium"
          flexWrap="wrap"
          fontFamily="mono"
        >
          {alphabet.map((letter: string) =>
            letter !== "#" ? (
              <Link to={`/subreddits/${letter.toLowerCase()}`}>{letter}</Link>
            ) : (
              <Link to={`/subreddits/all`}>#</Link>
            )
          )}
        </Flex>
      </Container>
      <Container my="2%" fontFamily="mono" fontWeight="medium">
        <StyledBox>
          <Text mb="1rem">
            Browse communities starting with '
            {letter === "all" ? "#" : letter.toUpperCase()}'
          </Text>
          <Divider />
          {communities && communities.length > 0 ? (
            <Grid mt={5} gridTemplateColumns="1fr 1fr 1fr 1fr">
              {communities.map((community: CommunityType) => (
                <Text color="blue.600">
                  <Link to={`/r/${community.username}`}>{community.name}</Link>
                </Text>
              ))}
            </Grid>
          ) : (
            <ErrorPage />
          )}
        </StyledBox>
      </Container>
    </>
  );
}
