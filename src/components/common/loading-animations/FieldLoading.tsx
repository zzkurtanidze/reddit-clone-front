import { Box, Grid } from "@chakra-ui/layout";
import React from "react";

export default function FieldLoading({
  width = "90%",
  withImage = true,
}: {
  width?: string;
  withImage?: boolean;
}) {
  return (
    <Box w={width}>
      <Grid
        gridTemplateColumns="0.1fr 2fr"
        alignItems="center"
        gridGap={5}
        id="wrapper"
      >
        {withImage ? (
          <Box
            w="40px"
            h="40px"
            borderRadius={50}
            bg="gray.200"
            id="animate"
          ></Box>
        ) : (
          <Box
            w="30px"
            h="10px"
            borderRadius={50}
            bg="gray.200"
            id="animate"
          ></Box>
        )}
        <Box
          w="100%"
          h="10px"
          bg="gray.200"
          borderRadius={50}
          id="animate"
        ></Box>
      </Grid>
    </Box>
  );
}
