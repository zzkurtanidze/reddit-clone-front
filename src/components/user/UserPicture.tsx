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
      boxShadow="1px 1px 6px rgba(0,0,0,.1)"
      borderRadius="50%"
      alt="profile-picture"
    />
  );
}
