import { Box, Divider, Text } from "@chakra-ui/layout";
import React from "react";

export default function SectionTitle({ label }: { label: string }) {
  return (
    <Box my={9}>
      <Text
        fontWeight="bold"
        fontSize={11}
        textTransform="uppercase"
        color="gray.500"
        my={2}
      >
        {label}
      </Text>
      <Divider />
    </Box>
  );
}
