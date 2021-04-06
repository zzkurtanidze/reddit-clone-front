import { Flex, Link, Text } from "@chakra-ui/react";
import CommunityPicture from "@components/community/common/CommunityPicture";
import React from "react";
import { PostType } from "../../types";

export default function PostedBy({ post }: { post: PostType }) {
  return (
    <Flex fontSize={12}>
      {post.postedTo && post.postedBy && (
        <>
          <Link
            fontWeight="bold"
            display="flex"
            gridGap={1}
            _focus={{}}
            href={`/r/${post.postedTo.username}`}
          >
            <CommunityPicture
              communityUsername={post.postedTo.username}
              imageSrc={post.postedTo.url}
              width="18px"
            />
            r/{post.postedTo.username}
          </Link>
          <Text color="gray.500" ml="10px">
            Posted By{" "}
            <Link
              href={`/user/${post.postedBy.username}`}
              _focus={{}}
              _active={{}}
            >
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
