//@ts-ignore
import { getCommunityByLetter } from "@api/";
import { Divider, Flex, Grid, Text } from "@chakra-ui/layout";
import Container from "@components/common/Container";
import StyledBox from "@components/common/StyledBox";
import ErrorPage from "@pages/error";
//@ts-ignore
import { CommunityType } from "@types/";
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
  const { communities } = getCommunityByLetter(letter);

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
          {communities && communities.length > 1 ? (
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
