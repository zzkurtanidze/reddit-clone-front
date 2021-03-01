import { Box, Button, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { UserType } from "../../types";
import ZoomImage from "../common/ZoomImage";

export default function UserCover({ user }: { user: UserType }) {
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
        src={
          user.coverImage
            ? `http://${user.coverImage}`
            : "https://www.zipjob.com/blog/wp-content/uploads/2020/08/linkedin-default-background-cover-photo-1.png"
        }
        alt="profile-cover"
        w="100vw"
        h="200px"
        zIndex={-5}
        objectFit="cover"
        className="user-image"
      />
      {zoomed && (
        <ZoomImage
          src={`http://${user.coverImage}`}
          onClose={() => setZoomed(!zoomed)}
        />
      )}
    </Box>
  );
}
