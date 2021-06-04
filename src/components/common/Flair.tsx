import { Text } from "@chakra-ui/layout";
import React from "react";

export default function Flair({
  flair,
}: {
  flair: {
    backgroundColor: string;
    textColor: string;
    text: string;
    ModOnly: boolean;
    CSSClass: string;
    id: string;
  };
}) {
  return (
    <Text
      bg={flair.backgroundColor}
      color={flair.textColor}
      w="max-content"
      h="max-content"
      fontSize={13}
      px="5px"
      py="0px"
      borderRadius={3}
      className={flair.CSSClass}
    >
      {flair.text}
    </Text>
  );
}
