import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { UserType } from "../../types";

export default function UserCover({ user }: { user: UserType }) {
  return (
    <Box position="absolute" top="0" boxShadow="0 0 5px rgba(0,0,0,.2)">
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
    </Box>
  );
}
