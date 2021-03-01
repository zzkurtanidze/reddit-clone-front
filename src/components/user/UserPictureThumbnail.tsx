import { Image } from "@chakra-ui/react";
import React from "react";

export default function UserPictureThumbnail({ image }: { image: string }) {
  const imageSrc = image
    ? `http://${image}`
    : "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg";

  return (
    <Image
      w="56px"
      borderRadius="50%"
      overflow="hidden"
      src={imageSrc}
      boxShadow="1px 1px 6px rgba(0,0,0,.1)"
      className="user-image"
    />
  );
}
