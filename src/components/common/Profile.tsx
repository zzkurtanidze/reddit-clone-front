import { Box, Image } from "@chakra-ui/react";
import React from "react";

export default function Profile({
  width = "200px",
  imageSrc,
}: {
  width?: string;
  imageSrc: string;
}) {
  const numWidth = parseInt(width.slice(0, width.length - 2));

  return (
    <Box
      w={width}
      h={width}
      border={numWidth <= 70 ? "0" : `${numWidth / 15}px solid white`}
      borderRadius="50%"
      overflow="hidden"
    >
      <Box w={width} h={width} position="absolute" zIndex={1}></Box>
      <Image
        src={imageSrc}
        w={width}
        h={width}
        boxShadow="1px 1px 6px rgba(0,0,0,.1)"
        className="user-image"
        objectFit="cover"
      />
    </Box>
  );
}
