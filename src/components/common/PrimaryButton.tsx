import { Button } from "@chakra-ui/react";
import React from "react";

export default function PrimaryButton({
  onClick,
  label,
  color = "white",
  bg = "#0079D3",
  icon = undefined,
  px = 50,
  ...rest
}: {
  onClick: any;
  label: string;
  color?: string;
  bg?: string;
  icon?: any;
  px?: number | string;
  [x: string]: any;
}) {
  return (
    <>
      <Button
        px={icon ? 4 : px}
        py="8px"
        h="max-content"
        fontSize={14}
        borderRadius={5}
        bg={bg}
        color={color}
        _hover={{ background: "#0094ff" }}
        _active={{ background: "#006bb7" }}
        _focus={{}}
        onClick={onClick}
        transition="0"
        gridGap={2}
        {...rest}
      >
        {icon && icon}
        {label}
      </Button>
    </>
  );
}
