import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import useOutsideClick from "../../utils/useOutsideClick";

export default function Dropdown({
  icon,
  children,
  title,
}: {
  icon?: any;
  children: any;
  title?: string | null;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const color = useColorModeValue("#333", "white");

  const ref = useRef();

  useOutsideClick(ref, () => {
    setIsExpanded(false);
  });

  return (
    //@ts-ignore
    <Box zIndex={10} ref={ref}>
      <Button
        bg="transparent"
        _focus={{ background: "rgba(255,255,255,.1)" }}
        borderRadius={0}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {icon && icon}
        <Text ml={2}>{title}</Text>
        <Box ml="10px">
          <AiFillCaretDown size={15} color={color} />
        </Box>
      </Button>
      <Box zIndex={1000}>{isExpanded && children}</Box>
    </Box>
  );
}
