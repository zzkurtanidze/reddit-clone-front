import React from "react";
import Profile from "../../common/Profile";

export default function UserPicture({
  image,
  width = "200px",
}: {
  image: string | undefined;
  width?: string;
}) {
  const imageSrc = image
    ? image
    : `${process.env.REACT_APP_ASSETS_URL}/avatar.png"`;

  return <Profile imageSrc={imageSrc} width={width} />;
}
