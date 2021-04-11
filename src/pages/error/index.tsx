import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

export default function ErrorPage() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Image
        src="http://localhost:4000/static/reddit-not-found.png"
        w="100px"
      />
      <Text fontFamily="mono" opacity="0.4" fontWeight="bold" fontSize={24}>
        Sorry, there doesn't seem to be anything here.
      </Text>
    </Flex>
  );
}
