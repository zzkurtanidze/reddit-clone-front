import { Box, Button, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { UserType } from "../../types";

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
        <Box>
          <Box
            w="100vw"
            h="100vh"
            position="fixed"
            top="0"
            bg="rgba(0,0,0,.9)"
            zIndex={5}
            onClick={() => setZoomed(!zoomed)}
          ></Box>
          <Button
            position="fixed"
            top="10px"
            right="10px"
            zIndex={5}
            onClick={() => setZoomed(!zoomed)}
          >
            Close
          </Button>
          <Image
            src={user.coverImage && `http://${user.coverImage}`}
            w="70vw"
            maxH="90vh"
            objectFit="scale-down"
            position="fixed"
            zIndex={5}
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
          />
        </Box>
      )}
    </Box>
  );
}
