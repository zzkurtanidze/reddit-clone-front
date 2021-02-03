import { Box } from "@chakra-ui/react";
import React from "react";

export default function Container({
  children,
  ...otherProps
}: {
  children: React.ReactNode;
}) {
  return (
    <Box {...otherProps} mx="17%" my="5%">
      {children}
    </Box>
  );
}
