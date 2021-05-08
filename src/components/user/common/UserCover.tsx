import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { UserType } from "../../../types";

export default function UserCover({ user }: { user: UserType }) {
  return (
    <Box position="absolute" top="57px" boxShadow="0 0 5px rgba(0,0,0,.2)">
      <Box
        w="99vw"
        h="200px"
        position="absolute"
        zIndex={1}
        cursor="pointer"
      ></Box>
      <Image
        src={
          user.coverImage
            ? user.coverImage
            : "https://www.zipjob.com/blog/wp-content/uploads/2020/08/linkedin-default-background-cover-photo-1.png"
        }
        alt="profile-cover"
        w="100vw"
        h="200px"
        zIndex={-5}
        objectFit="cover"
        className="user-image"
      />
    </Box>
  );
}
