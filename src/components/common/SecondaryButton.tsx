import { Button } from "@chakra-ui/button";
import React from "react";

export default function SecondaryButton({
  onClick,
  label,
  color = "#0079d3",
  bg = "white",
  icon = undefined,
  px = 5,
}: {
  onClick: any;
  label: string;
  color?: string;
  bg?: string;
  icon?: any;
  px?: number | string;
}) {
  return (
    <Button
      px={icon ? 4 : px}
      py="8px"
      h="max-content"
      border="1px solid #0079d3"
      fontSize={15}
      borderRadius={50}
      fontWeight="bold"
      bg={bg}
      color={color}
      _hover={{}}
      onClick={onClick}
      gridGap={2}
    >
      {icon && icon}
      {label}
    </Button>
  );
}
