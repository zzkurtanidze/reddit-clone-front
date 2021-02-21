import { Box } from "@chakra-ui/react";
import React from "react";

export default function StyledBox({
  children,
  ...otherProps
}: {
  children: any;
}) {
  return (
    <Box
      bg="gray.100"
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="4px"
      p="15px"
      {...otherProps}
    >
      {children}
    </Box>
  );
}
