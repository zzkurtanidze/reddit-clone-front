import { Box } from "@chakra-ui/react";
import React from "react";
import ProfilePicture from "../common/ProfilePicture";
const randomColor = require("randomcolor");

export default function CommunityPicture({
  imageSrc,
  communityName,
}: {
  imageSrc?: string;
  communityName?: string;
}) {
  console.log(imageSrc)
  return imageSrc ? (
    <ProfilePicture imageSrc={imageSrc} width="100px" />
  ) : (
    <Box
      w="100px"
      height="100px"
      color="white"
      bg={randomColor()}
      borderRadius="50%"
      fontSize={66.5}
      textAlign="center"
      userSelect="none"
    >
      {communityName![0]}
    </Box>
  );
}
