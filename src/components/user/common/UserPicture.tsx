import React from "react";
import Profile from "../../common/Profile";

export default function UserPicture({
  image,
  width = "200px",
}: {
  image: string | undefined;
  width?: string;
}) {
  const imageSrc = image ? image : "http://localhost:4000/static/avatar.png";

  return <Profile imageSrc={imageSrc} width={width} />;
}
