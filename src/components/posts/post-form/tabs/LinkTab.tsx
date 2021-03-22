import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";

export default function LinkTab() {
  return (
    <Box my={2}>
      <Textarea placeholder="Url" name="link" />
    </Box>
  );
}
