import { Box, Button, Image } from "@chakra-ui/react";
import React from "react";
import { RiCloseLine } from "react-icons/ri";

export default function ZoomImage({
  src,
  onClose,
}: {
  src: string;
  onClose: any;
}) {
  return (
    <Box>
      <Box
        w="100vw"
        h="100vh"
        position="fixed"
        top="0"
        left="0"
        bg="rgba(0,0,0,.9)"
        zIndex={5}
        onClick={onClose}
      ></Box>
      <Button
        position="fixed"
        top="10px"
        right="10px"
        zIndex={5}
        onClick={onClose}
        bg="transparent"
        color="gray.100"
        _active={{}}
        _focus={{}}
        _hover={{ color: "gray.400" }}
      >
        <RiCloseLine size={40} />
      </Button>
      <Image
        src={src}
        maxW="70vw"
        maxH="90vh"
        objectFit="scale-down"
        position="fixed"
        zIndex={5}
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
      />
    </Box>
  );
}
