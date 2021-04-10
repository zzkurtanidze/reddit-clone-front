import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Profile from "../../common/Profile";

import { Link } from "react-router-dom";
const randomColor = require("randomcolor");

export default function CommunityPicture({
  imageSrc,
  communityUsername,
  width = "80px",
  withLink = false,
  ...otherProps
}: {
  imageSrc: string;
  communityUsername: string;
  width?: string;
  withLink?: boolean;
  [x: string]: any;
}) {
  const numWidth = parseInt(width.slice(0, width.length - 2));

  return imageSrc && imageSrc !== "" ? (
    withLink ? (
      <Link to={`/r/${communityUsername}`}>
        <Profile imageSrc={imageSrc} width={width} isZoomable={false} />
      </Link>
    ) : (
      <Profile imageSrc={imageSrc} width={width} />
    )
  ) : (
    <Box
      w={width}
      h={width}
      color="white"
      bg={randomColor()}
      fontSize={numWidth / 1.8}
      borderRadius="50%"
      display="grid"
      placeItems="center"
      userSelect="none"
      border={numWidth <= 70 ? "0" : `${numWidth / 15}px solid white`}
      {...otherProps}
    >
      <Text textTransform="uppercase" lineHeight="0">
        {communityUsername[0]}
      </Text>
    </Box>
  );
}
