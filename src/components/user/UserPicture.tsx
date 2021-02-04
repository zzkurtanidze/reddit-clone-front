import { Image } from "@chakra-ui/react";
import React from "react";

export default function UserPicture({
  image,
  width = "200px",
}: {
  image: string | undefined;
  width: string;
}) {
  return (
    <Image
      src={
        image
          ? image
          : "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg"
      }
      w={width}
      boxShadow="2px 2px 10px rgba(0,0,0,.2)"
      borderRadius="50%"
      alt="profile-picture"
    />
  );
}
