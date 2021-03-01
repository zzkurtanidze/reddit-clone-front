import { Box, Button, Image, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { RiCloseLine } from "react-icons/ri";

export default function Modal({
  open,
  children,
  onClose,
  withImage = false,
}: {
  open: boolean;
  children?: React.ReactNode;
  onClose: any;
  withImage?: boolean;
}) {
  const bg = useColorModeValue("white", "gray.900");

  if (!open) return null;

  const portalDiv = document.getElementById("portal");
  if (!portalDiv) {
    throw new Error("The element portal not found.");
  }

  return ReactDOM.createPortal(
    <>
      <Box
        position="fixed"
        w="100vw"
        h="100vh"
        top="0"
        left="0"
        bg="rgba(0,0,0,.7)"
        onClick={onClose}
        zIndex={5}
      ></Box>
      <Box
        w="53%"
        h="max-content"
        bg={bg}
        position="fixed"
        top="50%"
        left="50%"
        minHeight="150px"
        zIndex={5}
        transform="translate(-50%, -50%)"
      >
        {withImage && (
          <Image
            float="left"
            mr="30px"
            w="100px"
            h="max-content"
            src="https://www.redditstatic.com/accountmanager/bbb584033aa89e39bad69436c504c9bd.png"
            alt="Art"
            objectFit="cover"
          />
        )}
        <Box position="relative">
          <Button onClick={onClose} position="absolute" top="5" right="5">
            <RiCloseLine size={24} />
          </Button>
          <Box py={29} px={30}>
            {children}
          </Box>
        </Box>
      </Box>
    </>,
    portalDiv
  );
}
