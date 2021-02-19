import { Button } from "@chakra-ui/react";
import React from "react";

export default function TabButton({
  icon,
  label,
  selected = false,
  onClick,
}: {
  icon: any;
  label: string;
  selected?: boolean;
  onClick: Function;
}) {
  return (
    <Button
      fontFamily="mono"
      color={selected ? "#0079D3" : "gray.500"}
      fontSize={16}
      w="100%"
      h="60px"
      gridGap={2}
      borderRadius={0}
      background={selected ? "#F2F8FD" : "none"}
      _hover={{ background: "gray.200" }}
      _active={{}}
      _focus={{}}
      borderBottom={selected ? "2px solid #0079D3" : ""}
      onClick={() => onClick()}
    >
      {icon && icon}
      {label}
    </Button>
  );
}
