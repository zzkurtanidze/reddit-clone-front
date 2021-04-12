import { Checkbox } from "@chakra-ui/checkbox";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import Container from "@components/common/Container";
import React from "react";

export default function ModQueueTab({
  communityUsername,
}: {
  communityUsername: string;
}) {
  return (
    <Container fontFamily="mono" size="big">
      <Text fontSize={20} fontWeight="medium">
        Mod Queue
      </Text>
      <br />
      <Text fontSize={12} fontWeight="bold" textTransform="uppercase">
        Posts
      </Text>
      <Flex borderRadius={5} alignItems="center" p="10px" w="100%" bg="#F7F9FA">
        <Checkbox bg="white" transform="scale(1.2)" _focus={{}} _active={{}} />
      </Flex>
      <Flex
        mt={2}
        borderRadius={5}
        bg="white"
        w="100%"
        minH="50vh"
        justifyContent="center"
        alignItems="center"
        direction="column"
        gridGap={2}
        fontFamily="mono"
      >
        <Image src="http://localhost:4000/static/cat_blep.png" w="25%" />
        <Text fontSize={18} fontWeight="semibold">
          The queue is clean!
        </Text>
        <Text fontWeight="medium" fontSize={14} opacity="0.5">
          Kitteh is pleased
        </Text>
      </Flex>
    </Container>
  );
}
