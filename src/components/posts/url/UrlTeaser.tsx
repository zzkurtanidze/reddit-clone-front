import { Image } from "@chakra-ui/image";
import { Box, Flex, Link } from "@chakra-ui/layout";
//@ts-ignore
import { PostType } from "@types/";
import React from "react";
import { HiExternalLink } from "react-icons/hi";
import DefaultLink from "./DefaultLink";

export default function UrlTeaser({ post }: { post: PostType }) {
  return (
    <Flex direction={"row"} minW="100%" justifyContent="space-between">
      <DefaultLink post={post} />
      {post.urlData.images && (
        <Box position="relative">
          <Link
            w="max-content"
            h="max-content"
            target="_blank"
            fontSize={12}
            _active={{}}
            _focus={{}}
            color="blue.500"
            href={post.url}
          >
            <Image
              src={post.urlData.images[0]}
              alt={post.urlData.title}
              minW="50px"
              minH="50px"
              w="150px"
              h="auto"
              maxW={"150px"}
              maxH={"100px"}
              objectFit="cover"
              objectPosition="0 0"
              borderRadius={"7px"}
              overflow="hidden"
              border={"1px solid #1384D7"}
              marginTop={"-20%"}
            />
            <Box
              bg="#1384D7"
              p={0.5}
              position="absolute"
              bottom="0"
              right="0"
              borderEndEndRadius="7px"
              borderStartStartRadius="5px"
            >
              <HiExternalLink color="white" size={12} />
            </Box>
          </Link>
        </Box>
      )}
    </Flex>
  );
}
