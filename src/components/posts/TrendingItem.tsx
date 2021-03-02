import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";
import { PostType } from "../../types/index";

export default function TrendingItem({ item }: { item: PostType }) {
  return (
    <Link _hover={{}} _focus={{}} href={`/post/${item._id}`}>
      <Box
        position="relative"
        h="170px"
        bgImage={`linear-gradient(0deg, rgba(0,0,0) -20%, rgba(255,255,255,0) 120%), url(http://${item.image})`}
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
          <Text
            fontSize={12}
            dangerouslySetInnerHTML={{ __html: `${item.body.slice(0, 40)}...` }}
          ></Text>
          <Text fontSize={10} m="5px" fontFamily="mono">
            {item.postedTo.name}
          </Text>
        </Box>
      </Box>
    </Link>
  );
}
