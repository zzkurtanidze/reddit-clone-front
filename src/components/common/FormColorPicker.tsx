import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { ColorResult, TwitterPicker } from "react-color";
import useOutsideClick from "@utils/useOutsideClick";

export default function FormColorPicker({
  setValues,
  values,
  name,
  label,
  initialColor,
}: {
  setValues: any;
  values: any;
  name: string;
  label: string;
  initialColor?: string;
}) {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [color, setColor] = useState<any>(initialColor);

  const colors = [
    "#ABB8C3",
    "#000000",
    "#FFFFFF",
    "#ccc",
    "#2598f7",
    "#27ea7f",
    "#e0e035",
    "#f72020",
    "#9833ea",
  ];

  useEffect(() => {
    setValues({ ...values, [name]: color });
  }, [color]);

  const ref = useRef();

  useOutsideClick(ref, () => {
    setShowPicker(false);
  });

  return (
    <Flex
      gridGap={2}
      justifyContent="space-between"
      w="99%"
      position="relative"
      //@ts-ignore
      ref={ref}
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
        <Box zIndex={2} position="absolute" right="-78%" top="39px">
          <TwitterPicker
            colors={colors}
            onChangeComplete={(col: ColorResult) => setColor(col.hex)}
          />
        </Box>
      )}
    </Flex>
  );
}
