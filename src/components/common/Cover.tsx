import { Box, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import ZoomImage from "./ZoomImage";

export default function Cover({ coverImage }: { coverImage: string }) {
  const [zoomed, setZoomed] = useState<boolean>(false);

  return (
    <Box position="absolute" top="57px" boxShadow="0 0 5px rgba(0,0,0,.2)">
      <Box
        w="99vw"
        h="200px"
        position="absolute"
        onClick={() => setZoomed(!zoomed)}
        zIndex={1}
        cursor="pointer"
      ></Box>
      <Image
        src={coverImage ? coverImage : "http://localhost:4000/static/123.jpg"}
        alt="profile-cover"
        w="100vw"
        h="200px"
        zIndex={-5}
        objectFit="cover"
        className="user-image"
      />
      {zoomed && (
        <ZoomImage src={coverImage} onClose={() => setZoomed(!zoomed)} />
      )}
    </Box>
  );
}
