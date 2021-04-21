import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import React from "react";

export default function SectionTitle({
  label,
  icon,
  ...otherProps
}: {
  label: string;
  icon?: JSX.Element;
  [x: string]: any;
}) {
  return (
    <>
      <Flex gridGap={1} alignItems="center" my={9} {...otherProps}>
        {icon && icon}
        <Text
          fontWeight="bold"
          fontSize={11}
          textTransform="uppercase"
          color="gray.500"
          my={2}
        >
          {label}
        </Text>
      </Flex>
      <Divider />
    </>
  );
}
