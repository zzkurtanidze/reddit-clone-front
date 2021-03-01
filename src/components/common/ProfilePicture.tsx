import { Box, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import ZoomImage from "./ZoomImage";

export default function ProfilePicture({
  width = "200px",
  imageSrc,
  isZoomable = true,
}: {
  width?: string;
  imageSrc: string;
  isZoomable?: boolean;
}) {
  const [zoomed, setZoomed] = useState<boolean>(false);

  return (
    <Box w={width} borderRadius="50%" overflow="hidden">
      <Box
        w="100%"
        h="100%"
        position="absolute"
        onClick={() => setZoomed(!zoomed)}
        zIndex={1}
        cursor="pointer"
      ></Box>
      <Image
        src={imageSrc}
        boxShadow="1px 1px 6px rgba(0,0,0,.1)"
        className="user-image"
      />
      {isZoomable && zoomed && (
        <ZoomImage src={imageSrc} onClose={() => setZoomed(!zoomed)} />
      )}
    </Box>
  );
}
