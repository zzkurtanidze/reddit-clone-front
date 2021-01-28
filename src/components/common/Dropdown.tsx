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
      <Button borderRadius={0} onClick={() => setIsExpanded(!isExpanded)}>
        <VscAccount color={color} />
        <Text ml={2}>{title}</Text>
        <Box ml="10px">{icon && icon}</Box>
      </Button>
      {isExpanded && children}
    </>
  );
}
