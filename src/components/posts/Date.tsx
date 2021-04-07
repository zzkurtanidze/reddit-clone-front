import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { PostType } from "../../types";
//@ts-ignore
import TimeAgo from "javascript-time-ago";

//@ts-ignore
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

export default function Date({ post }: { post: PostType }) {
  const timeAgo = new TimeAgo("en-US");

  return (
    <Box>
      <Text fontSize={12} color="gray.500">
        {timeAgo.format(post.date)}
      </Text>
    </Box>
  );
}
