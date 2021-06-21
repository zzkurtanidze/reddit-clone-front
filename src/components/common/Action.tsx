import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";

export default function Action({
  prefix,
  label,
  description,
  button,
  secondButton,
}: {
  prefix?: string;
  label?: string;
  description?: string;
  button?: JSX.Element;
  secondButton?: JSX.Element;
}) {
  return (
    <Flex
      fontFamily="mono"
      alignItems="center"
      justifyContent="space-between"
      my={5}
    >
      <Box>
        {prefix && (
          <Text fontSize={12} color="red.500" fontWeight="bold">{prefix}</Text>
        )}
        <Text fontSize={16}>{label && label}</Text>
        {description && (
          <Text fontSize={12} color="gray.500">
            {description}
          </Text>
        )}
      </Box>
      <Flex gridGap={2}>
        {button && button}
        {secondButton && secondButton}
      </Flex>
    </Flex>
  );
}
