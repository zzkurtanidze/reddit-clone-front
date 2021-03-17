import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";
import ProfilePicture from "../common/ProfilePicture";
const randomColor = require("randomcolor");

export default function CommunityPicture({
  imageSrc,
  communityUsername,
  width = "200px",
  withLink = false,
}: {
  imageSrc: string;
  communityUsername: string;
  width?: string;
  withLink?: boolean;
}) {
  const numWidth = parseInt(width.slice(0, width.length - 2));

  return imageSrc && imageSrc !== "" ? (
    withLink ? (
      <Link
        href={`/r/${communityUsername}`}
        _hover={{}}
        _active={{}}
        _focus={{}}
      >
        <ProfilePicture imageSrc={imageSrc} width={width} isZoomable={false} />
      </Link>
    ) : (
      <ProfilePicture imageSrc={imageSrc} width={width} />
    )
  ) : (
    <Box
      w={width}
      h={width}
      color="white"
      bg={randomColor()}
      borderRadius="50%"
      fontSize={numWidth / 1.8}
      display="grid"
      placeItems="center"
      userSelect="none"
      border={numWidth <= 70 ? "0" : `${numWidth / 20}px solid white`}
      boxShadow="0 0 10px rgba(0,0,0,.35)"
    >
      <Text textTransform="uppercase" lineHeight="0">
        {communityUsername[0]}
      </Text>
    </Box>
  );
}
