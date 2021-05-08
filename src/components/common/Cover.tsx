import { Box, Image } from "@chakra-ui/react";
import React, { useState } from "react";

export default function Cover({ coverImage }: { coverImage: string }) {
  return (
    <Box position="absolute" top="57px" boxShadow="0 0 5px rgba(0,0,0,.2)">
      <Box
        w="99vw"
        h="220px"
        position="absolute"
        zIndex={1}
        cursor="pointer"
      ></Box>
      <Box w="99vw" h="220px">
        {coverImage ? (
          <Image
            src={coverImage}
            alt="profile-cover"
            w="100%"
            h="100%"
            zIndex={-5}
            objectFit="cover"
            className="user-image"
          />
        ) : (
          <Box w="100%" h="100%" zIndex={-5} backgroundColor="#0079D3"></Box>
        )}
      </Box>
    </Box>
  );
}
