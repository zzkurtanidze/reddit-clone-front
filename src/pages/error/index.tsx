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
      w="100%"
      h="100%"
      justifyContent="center"
      alignItems="center"
      direction="column"
      {...otherProps}
      fontSize={24}
    >
      <Image
        src={`${process.env.REACT_APP_ASSETS_URL}/reddit-not-found.png`}
        w="100px"
      />
      <Text fontFamily="mono" opacity="0.4" fontWeight="bold">
        {text ? text : "Sorry, there doesn't seem to be anything here."}
      </Text>
      {button && button}
    </Flex>
  );
}
