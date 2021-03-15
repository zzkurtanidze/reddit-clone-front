import { Button } from "@chakra-ui/react";
import React from "react";

export default function PrimaryButton({
  onClick,
  label,
  color = "white",
  bg = "#1384D7",
  icon = undefined,
}: {
  onClick: any;
  label: string;
  color?: string;
  bg?: string;
  icon?: any;
}) {
  return (
    <>
      <Button
        px={icon ? 4 : 50}
        py="8px"
        h="max-content"
        fontSize={14}
        borderRadius={50}
        bg={bg}
        color={color}
        _hover={{}}
        onClick={onClick}
        gridGap={2}
      >
        {icon && icon}
        {label}
      </Button>
    </>
  );
}
