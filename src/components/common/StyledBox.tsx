import { Box } from "@chakra-ui/react";
import React from "react";

export default function StyledBox({
  children,
  ...otherProps
}: {
  children: any;
  [x: string]: any;
}) {
  return (
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
