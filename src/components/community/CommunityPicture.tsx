import { Box, Text } from "@chakra-ui/react";
import React from "react";
import ProfilePicture from "../common/ProfilePicture";
const randomColor = require("randomcolor");

export default function CommunityPicture({
  imageSrc,
  communityName,
  width = "200px",
}: {
  imageSrc?: string;
  communityName?: string;
  width?: string;
}) {
  const numWidth = parseInt(width.slice(0, width.length - 2));

  return imageSrc && imageSrc !== "" ? (
    <ProfilePicture imageSrc={imageSrc} width={width} />
  ) : (
    <Box
      w={width}
      height={width}
      color="white"
      bg={randomColor()}
      borderRadius="50%"
      fontSize={numWidth / 1.4}
      display="grid"
      placeItems="center"
      userSelect="none"
      border={numWidth <= 70 ? "0" : `${numWidth / 20}px solid white`}
      boxShadow="0 0 10px rgba(0,0,0,.35)"
    >
      <Text lineHeight="0">{communityName![0]}</Text>
    </Box>
  );
}
