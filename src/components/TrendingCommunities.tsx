import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

export default function TrendingCommunities() {
  return (
    <Box
      borderRadius={5}
      border="1px"
      borderColor="gray.300"
      w="100%"
      h="max-content"
      bg="gray.100"
      p={15}
    >
      <Text fontWeight="bold" fontSize={14}>
        Trending Communities
      </Text>
      <Flex mt="15px" direction="column" gridGap={5}>
        <TrendingCommunity />
        <TrendingCommunity />
        <TrendingCommunity />
        <TrendingCommunity />
      </Flex>
    </Box>
  );
}

const TrendingCommunity: React.FC = () => {
  return (
    <Flex gridGap={3}>
      <Image
        w={8}
        h={8}
        borderRadius="50%"
        src="https://b.thumbs.redditmedia.com/yATNSyOCcGXzD1GPqYvypod7g8czHhUvxUMEs4CjxTA.png"
      />
      <Box>
        <Text letterSpacing={-0.2} fontWeight="bold" fontSize={12}>
          r/OldSchoolRidicilous
        </Text>
        <Text fontSize={10}>25,152 Members</Text>
      </Box>
      <Button
        px={50}
        py="8px"
        h="max-content"
        fontSize={14}
        borderRadius={50}
        bg="#1384D7"
        color="white"
        _hover={{
          backgroundColor: "#3c9ce0",
        }}
      >
        Join
      </Button>
    </Flex>
  );
};
