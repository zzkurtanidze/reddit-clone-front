import { PostType } from "../../types/";
import React from "react";
import UrlTeaser from "./url/UrlTeaser";
import VideoTeaser from "./url/VideoTeaser";
import ImageTeaser from "./url/ImageTeaser";

export default function Url({ post }: { post: PostType }) {
  const mediaTypes = {
    website: <UrlTeaser post={post} />,
    object: <UrlTeaser post={post} />,
    video: <VideoTeaser post={post} />,
    "video.other": <VideoTeaser post={post} />,
    image: <ImageTeaser post={post} />,
  };

  console.log(post.urlData);

  //@ts-ignore
  return post.url && mediaTypes[post.urlData.mediaType] ? (
    //@ts-ignore
    mediaTypes[post.urlData.mediaType]
  ) : (
    <UrlTeaser post={post} />
  );
}
