import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
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

  const color = useColorModeValue("#858887", "white");

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
        _active={{}}
        _hover={{ border: "1px solid rgba(133, 136, 135, .7)" }}
        borderRadius={2}
        border="1px solid transparent"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {icon && icon}
        <Text fontFamily="mono" fontWeight="light" fontSize={16} ml={2}>
          {title}
        </Text>
        <Box ml="10px">
          <AiFillCaretDown size={15} color={color} />
        </Box>
      </Button>
      <Box zIndex={1000}>{isExpanded && children}</Box>
    </Box>
  );
}
