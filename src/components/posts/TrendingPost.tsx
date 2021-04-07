import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { PostType } from "../../types/index";
import { Link } from "react-router-dom";
export default function TrendingItem({ item }: { item: PostType }) {
  return item.image ||
    (item.urlData && item.urlData.images) ||
    (item.urlData && item.urlData.favicons[0]) ? (
    <Link to={`/post/${item._id}`}>
      <Box
        position="relative"
        h="170px"
        bgImage={`linear-gradient(0deg, rgba(0,0,0) -20%, rgba(255,255,255,0) 120%), url(${
          item.image ||
          (item.urlData && item.urlData.images && item.urlData.images[0]) ||
          item.url ||
          (item.urlData && item.urlData.favicons[0]) ||
          ""
        })`}
        bgSize="cover"
        bgPosition="0 50%"
        bgRepeat="no-repeat"
        borderRadius="10px"
        cursor="pointer"
      >
        <Box position="absolute" bottom="5px" color="white" left="10px">
          <Text fontSize="16px" fontWeight="bold">
            {item.title}
          </Text>
          {item.body && (
            <Text
              fontSize={12}
              dangerouslySetInnerHTML={{
                __html: `${item.body.slice(0, 40)}...`,
              }}
            ></Text>
          )}
          <Text fontSize={10} my={1} fontFamily="mono">
            r/{item.postedTo.username}
          </Text>
        </Box>
      </Box>
    </Link>
  ) : (
    <></>
  );
}
