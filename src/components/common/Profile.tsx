import { Box, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import ZoomImage from "./ZoomImage";

export default function Profile({
  width = "200px",
  imageSrc,
  isZoomable = true,
}: {
  width?: string;
  imageSrc: string;
  isZoomable?: boolean;
}) {
  const [zoomed, setZoomed] = useState<boolean>(false);
  const numWidth = parseInt(width.slice(0, width.length - 2));

  return (
    <Box
      w={width}
      h={width}
      border={numWidth <= 70 ? "0" : `${numWidth / 15}px solid white`}
      borderRadius="50%"
      overflow="hidden"
    >
      <Box
        w={width}
        h={width}
        position="absolute"
        onClick={() => setZoomed(!zoomed)}
        zIndex={1}
      ></Box>
      <Image
        src={imageSrc}
        w={width}
        h={width}
        boxShadow="1px 1px 6px rgba(0,0,0,.1)"
        className="user-image"
        objectFit="cover"
      />
      {isZoomable && zoomed && (
        <ZoomImage src={imageSrc} onClose={() => setZoomed(!zoomed)} />
      )}
    </Box>
  );
}
