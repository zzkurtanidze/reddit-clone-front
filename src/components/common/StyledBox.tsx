import { Box } from "@chakra-ui/react";
import React from "react";

export default function StyledBox({
  children,
  title,
  titleBackground,
  ...otherProps
}: {
  children: any;
  title?: string;
  titleBackground?: string;
  [x: string]: any;
}) {
  return title && titleBackground ? (
    <Box
      bg="white"
      overflow="hidden"
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="4px"
      position="relative"
      {...otherProps}
    >
      <Box
        w="100%"
        color="white"
        fontWeight="bold"
        fontFamily="mono"
        fontSize={14}
        bg={titleBackground}
        h="max-content"
        px="15px"
        py="10px"
      >
        {title}
      </Box>
      <Box p="15px">{children}</Box>
    </Box>
  ) : (
    <Box
      bg="white"
      overflow="hidden"
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="4px"
      p="15px"
      position="relative"
      {...otherProps}
    >
      {children}
    </Box>
  );
}
