import { Flex, Text } from "@chakra-ui/react";
import CommunityPicture from "@components/community/common/CommunityPicture";
import React from "react";
import { PostType } from "../../types";

import { Link } from "react-router-dom";
import Date from "./Date";

export default function PostedBy({
  post,
  withIcon = true,
}: {
  post: PostType;
  withIcon?: boolean;
}) {
  return (
    <Flex fontSize={12} gridGap={1}>
      {post.postedTo && post.postedBy && post.date && (
        <>
          <Link to={`/r/${post.postedTo.username}`}>
            <Text fontWeight="bold" display="flex" gridGap={1}>
              {withIcon && (
                <CommunityPicture
                  communityUsername={post.postedTo.username}
                  imageSrc={post.postedTo.url}
                  width="18px"
                />
              )}
              r/{post.postedTo.username}
            </Text>
          </Link>
          <Text color="gray.500" fontWeight="light">
            •
          </Text>
          <Text color="gray.500">
            Posted By{" "}
            <Link to={`/user/${post.postedBy.username}`}>
              {post.postedBy.displayName
                ? post.postedBy.displayName
                : post.postedBy.username}
            </Link>
          </Text>
          <Date post={post} />
        </>
      )}
    </Flex>
  );
}
