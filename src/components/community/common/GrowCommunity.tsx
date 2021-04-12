import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import StyledBox from "@components/common/StyledBox";
import React from "react";
import { HiPlusCircle } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import LeftSideDrawing from "@assets/left-side-drawing.png";
import { useHistory } from "react-router-dom";

export default function GrowCommunity({
  communityUsername,
}: {
  communityUsername: string;
}) {
  const history = useHistory();

  return (
    <StyledBox position="relative" fontFamily="mono">
      <Text fontSize={22} fontWeight="medium">
        Grow your community
      </Text>
      <Button
        bg="none"
        top="10px"
        p="0"
        _active={{}}
        _focus={{}}
        right="10px"
        position="absolute"
      >
        <IoMdClose size={20} color="a5a5a5" />
      </Button>
      <Flex
        px="15px"
        py="5px"
        my="5px"
        borderWidth="1px"
        borderColor="gray.300"
        borderRadius={5}
        alignItems="center"
        gridGap={2}
        position="relative"
        bgImage={`url(${LeftSideDrawing})`}
        bgSize="50%"
        bgRepeat="no-repeat"
        bgPosition="0px 0px"
      >
        <Box alignSelf="flex-start">
          <HiPlusCircle size={50} color="#9a2de2" />
        </Box>
        <Box>
          <Text fontSize={24} fontWeight="medium">
            Time to make your first post!
          </Text>
          <Text
            fontSize={14}
            fontWeight="medium"
            mt={1}
            w="80%"
            color="gray.400"
          >
            Now that you've created your community, start things off right by
            making your first post.
          </Text>
          <Button
            bg="#9a2de2"
            fontSize={14}
            h="max-content"
            py={2}
            my={2}
            _hover={{}}
            _active={{}}
            _focus={{}}
            color="white"
            borderRadius={50}
            onClick={() => history.push(`/${communityUsername}/submit`)}
          >
            Make Your First Post
          </Button>
          <Button
            position="absolute"
            bg="none"
            p={0}
            top={0}
            _hover={{}}
            _active={{}}
            _focus={{}}
            right={0}
          >
            <IoMdClose size={14} color="#a5a5a5" />
          </Button>
        </Box>
      </Flex>
    </StyledBox>
  );
}
