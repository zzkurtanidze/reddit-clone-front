import { Box } from "@chakra-ui/react";
import React from "react";

export default function Container({
  children,
  ...otherProps
}: {
  children: React.ReactNode;
  [x: string]: any;
}) {
  return (
    <Box mx="17%" my="5%" {...otherProps}>
      {children}
    </Box>
  );
}
