import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { VscAccount } from "react-icons/vsc";

export default function Dropdown({
  setIsExpanded,
  isExpanded,
  icon,
  children,
  title,
}: {
  setIsExpanded: Function;
  isExpanded: boolean;
  icon?: any;
  children: any;
  title?: string | null;
}) {
  const color = useColorModeValue("#333", "white");
  return (
    <>
      <Button
        bg="transparent"
        _focus={{ background: "rgba(255,255,255,.1)" }}
        borderRadius={0}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <VscAccount color={color} />
        <Text ml={2}>{title}</Text>
        <Box ml="10px">{icon && icon}</Box>
      </Button>
      <Box zIndex={1000}>{isExpanded && children}</Box>
    </>
  );
}
