import { Box, Flex, Grid } from "@chakra-ui/layout";
import Votes from "@components/posts/Votes";
import React from "react";

export default function PostLoading() {
  return (
    <Box w="100%" h="50vh" my={2} overflow="hidden">
      <Grid gridTemplateColumns="0.07fr 1fr" gridGap={4} id="wrapper">
        <Votes />
        <Flex direction="column" gridGap={2}>
          <Box id="animate" h="10px" w="100%"></Box>
          <Box id="animate" h="20px" w="70%"></Box>
          <Box id="animate" h="300px" w="80%"></Box>
        </Flex>
      </Grid>
    </Box>
  );
}
