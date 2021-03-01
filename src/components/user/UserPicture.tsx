import { Box, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import ZoomImage from "../common/ZoomImage";

export default function UserPicture({
  image,
  width = "200px",
}: {
  image: string | undefined;
  width: string;
}) {
  const [zoomed, setZoomed] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>(
    image
      ? `http://${image}`
      : "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg"
  );

  return (
    <Box w={width} h={width} borderRadius="50%" overflow="hidden">
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
      {zoomed && (
        <ZoomImage src={imageSrc} onClose={() => setZoomed(!zoomed)} />
      )}
    </Box>
  );
}
