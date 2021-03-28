import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";

export default function Action({
  label,
  description,
  button,
}: {
  label?: string;
  description?: string;
  button?: JSX.Element;
}) {
  return (
    <Flex fontFamily="mono" justifyContent="space-between" my={5}>
      <Box>
        <Text fontSize={16}>{label && label}</Text>
        {description && (
          <Text fontSize={12} color="gray.500">
            {description}
          </Text>
        )}
      </Box>
      {button && button}
    </Flex>
  );
}
