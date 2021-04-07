import { Flex, Text } from "@chakra-ui/react";
import CommunityPicture from "@components/community/common/CommunityPicture";
import React from "react";
import { PostType } from "../../types";

import { Link } from "react-router-dom";

export default function PostedBy({ post }: { post: PostType }) {
  return (
    <Flex fontSize={12}>
      {post.postedTo && post.postedBy && (
        <>
          <Link to={`/r/${post.postedTo.username}`}>
            <Text fontWeight="bold" display="flex" gridGap={1}>
              <CommunityPicture
                communityUsername={post.postedTo.username}
                imageSrc={post.postedTo.url}
                width="18px"
              />
              r/{post.postedTo.username}
            </Text>
          </Link>
          <Text color="gray.500" ml="10px">
            Posted By{" "}
            <Link to={`/user/${post.postedBy.username}`}>
              {post.postedBy.displayName
                ? post.postedBy.displayName
                : post.postedBy.username}
            </Link>
          </Text>
        </>
      )}
    </Flex>
  );
}
