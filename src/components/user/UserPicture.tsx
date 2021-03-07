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
    : "http://localhost:4000/static/1614470100879.jpg";

  return (
    <ProfilePicture imageSrc={imageSrc} width={width} isZoomable={isZoomable} />
  );
}
