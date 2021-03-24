import { Image } from "@chakra-ui/image";
import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import { PostType } from "../../types/";
import React from "react";
import { HiExternalLink } from "react-icons/hi";

export default function Url({ post }: { post: PostType }) {
  return (
    post.url &&
    (post.urlData.mediaType === "website" ||
    post.urlData.mediaType === "object" ||
    post.image ? (
      <Flex direction={"row"} minW="100%" justifyContent="space-between">
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
          <Flex>
            <Text textOverflow="ellipsis" maxW="200px" noOfLines={1}>
              {post.url}
            </Text>
            <HiExternalLink size={14} />
          </Flex>
        </Link>
        {post.urlData.images[0] && (
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
    ) : (
      <Flex direction="column" minW="100%">
        <Link
          w="max-content"
          h="max-content"
          fontSize={12}
          color="blue.500"
          href={post.url}
        >
          <Flex>
            <Text textOverflow="ellipsis" maxW="200px" noOfLines={1}>
              {post.url}
            </Text>
            <HiExternalLink size={14} />
          </Flex>
        </Link>
        {post.urlData.images[0] && (
          <Link
            href={post.url}
            _active={{}}
            _focus={{}}
            _hover={{}}
            target="_blank"
          >
            <Box marginTop="5px" bg="#eaeaea" position="relative">
              <Image
                src={post.urlData.images[0]}
                alt={post.urlData.title}
                w="100%"
                h="auto"
                position="relative"
                overflow="hidden"
              />
              <Box p={3}>
                <Text fontWeight="bold" fontSize={20} fontFamily="mono">
                  {post.urlData.title}
                </Text>
                <Text
                  color="gray.500"
                  noOfLines={1}
                  textOverflow="ellipsis"
                  fontSize={12}
                  fontFamily="mono"
                >
                  {post.urlData.description}
                </Text>
              </Box>
            </Box>
          </Link>
        )}
      </Flex>
    ))
  );
}
