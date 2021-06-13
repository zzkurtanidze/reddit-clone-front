/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { ChromePicker, ColorResult, TwitterPicker } from "react-color";
import useOutsideClick from "@utils/useOutsideClick";
import SecondaryButton from "./SecondaryButton";

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
  const [showChromePicker, setShowChromePicker] = useState<boolean>(false);

  const colors = [
    "#EB3C29",
    "#FB4729",
    "#FEB133",
    "#FFD639",
    "#94E044",
    "#58D160",
    "#3ED3BB",
    "#B92E20",
    "#CC381F",
    "#CB8C27",
    "#CCAC2B",
    "#73AD34",
    "#419E48",
    "#2CA18F",
    "#0079D3",
    "#004980",
    "#7291FB",
    "#F766AB",
    "#9E8D49",
    "#EDEFF1",
    "#373C3F",
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
        <Flex
          direction="column"
          zIndex={2}
          position="absolute"
          right="-79%"
          top="36px"
          bg="white"
          alignItems="center"
          boxShadow="0px 3px 5px rgba(0,0,0,.2)"
        >
          <TwitterPicker
            colors={colors}
            styles={{
              default: {
                card: {
                  boxShadow: "",
                },
              },
            }}
            onChangeComplete={(col: ColorResult) => setColor(col.hex)}
          />
          <SecondaryButton
            w="80%"
            m="auto"
            mt={1}
            label="Use Browser Color Picker"
            onClick={() => setShowChromePicker(!showChromePicker)}
            textTransform="uppercase"
            bg="none"
            border="0"
          />
          {showChromePicker && (
            <Box position="absolute" top="-90px">
              <ChromePicker
                color={color}
                onChangeComplete={(col: ColorResult) => setColor(col.hex)}
              />
            </Box>
          )}
        </Flex>
      )}
    </Flex>
  );
}
