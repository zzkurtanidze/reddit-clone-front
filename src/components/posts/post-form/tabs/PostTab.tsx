import { Box } from "@chakra-ui/react";
import React from "react";
//@ts-ignore
const ReactQuill = require("react-quill");

export default function PostTab({
  post,
  onChange,
}: {
  post: {
    title: string;
    body: string;
    image: string;
    postedTo: string;
  };
  onChange: Function;
}) {
  return (
    <Box bg="white" my={4}>
      <ReactQuill value={post.body} onChange={onChange} />
    </Box>
  );
}
