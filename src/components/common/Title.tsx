import { Box, Text } from "@chakra-ui/layout";
import React from "react";

export default function Title({ label }: { label: string }) {
  return (
    <Text fontFamily="mono" fontSize={22} fontWeight="500">
      {label}
    </Text>
  );
}
