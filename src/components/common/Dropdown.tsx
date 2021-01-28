import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { VscAccount } from "react-icons/vsc";

export default function Dropdown({
  setIsExpanded,
  isExpanded,
  icon,
  children,
}: {
  setIsExpanded: Function;
  isExpanded: boolean;
  icon: any;
  children: any;
}) {
  const color = useColorModeValue("#333", "white");
  return (
    <>
      <Button onClick={() => setIsExpanded(!isExpanded)}>
        <VscAccount color={color} />
        <Box ml="10px">{icon && icon}</Box>
      </Button>
      {isExpanded && children}
    </>
  );
}
