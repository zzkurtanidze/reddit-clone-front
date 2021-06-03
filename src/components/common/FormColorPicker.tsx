import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { TwitterPicker } from "react-color";

export default function FormColorPicker({
  setValues,
  label,
}: {
  setValues: any;
  label: string;
}) {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [color, setColor] = useState("white");

  return (
    <Flex
      gridGap={2}
      justifyContent="space-between"
      w="99%"
      position="relative"
    >
      <Text fontFamily="mono" fontSize={14} fontWeight="medium">
        {label}
      </Text>
      <Button
        p={0}
        bg="none"
        w="max-content"
        h="max-content"
        _hover={{}}
        _focus={{}}
        _active={{}}
        onClick={() => setShowPicker(!showPicker)}
      >
        <Box bg={color} w="25px" h="25px" borderRadius={2}></Box>
      </Button>
      {showPicker && (
        <Box position="absolute" right="-78%" top="39px">
          <TwitterPicker />
        </Box>
      )}
    </Flex>
  );
}
