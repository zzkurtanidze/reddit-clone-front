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
          ? `http://${image}`
          : "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg"
      }
      w={width}
      h={width}
      boxShadow="1px 1px 6px rgba(0,0,0,.1)"
      borderRadius="50%"
      alt="aaaaa"
      className="user-image"
    />
  );
}
