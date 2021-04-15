import { Box } from "@chakra-ui/react";
import React from "react";

export default function Container({
  children,
  size = "norm",
  ...otherProps
}: {
  children: React.ReactNode;
  size?: string;
  [x: string]: any;
}) {
  const sizes = {
    sm: ["10%", "2%"],
    norm: ["17%", "5%"],
    big: ["24%", "10%"],
  };

  return (
    //@ts-ignore
    <Box mx={sizes[size][0]} my={sizes[size][1]} {...otherProps}>
      {children}
    </Box>
  );
}
