import { Box, Grid } from "@chakra-ui/layout";
import React from "react";

export default function FieldLoading({ count }: { count?: number }) {
  return (
    <Box w="90%" m="auto">
      <Field />
    </Box>
  );
}

const Field = () => {
  return (
    <Grid
      templateColumns="0.1fr 2fr"
      alignItems="center"
      gridGap={5}
      h="60px"
      id="wrapper"
      my={1}
    >
      <Box w="40px" h="40px" borderRadius={50} bg="gray.200" id="animate"></Box>
      <Box w="100%" h="5px" bg="gray.200" borderRadius={50} id="animate"></Box>
    </Grid>
  );
};
