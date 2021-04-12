import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

export default function ErrorPage({
  button,
  text,
  ...otherProps
}: {
  button?: JSX.Element;
  text?: string;
  [x: string]: any;
}) {
  return (
    <Flex
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
      {...otherProps}
      fontSize={24}
    >
      <Image
        src="http://localhost:4000/static/reddit-not-found.png"
        w="100px"
      />
      <Text fontFamily="mono" opacity="0.4" fontWeight="bold">
        {text ? text : "Sorry, there doesn't seem to be anything here."}
      </Text>
      {button && button}
    </Flex>
  );
}
