import React from "react";
import ProfilePicture from "../common/ProfilePicture";

export default function UserPicture({
  image,
  width = "200px",
  isZoomable,
}: {
  image: string | undefined;
  width?: string;
  isZoomable?: boolean;
}) {
  const imageSrc = image
    ? `http://${image}`
    : "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg";

  return (
    <ProfilePicture imageSrc={imageSrc} width={width} isZoomable={isZoomable} />
  );
}
