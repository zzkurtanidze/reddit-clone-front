import { Box, Button, Image, useColorModeValue } from "@chakra-ui/react";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { RiCloseLine } from "react-icons/ri";
import { JsxChild } from "typescript";

export default function Modal({
  open,
  children,
  onClose,
}: {
  open: boolean;
  children?: React.ReactNode;
  onClose: any;
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
      ></Box>
      <Box
        w="53%"
        h="max-content"
        bg={bg}
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Image
          float="left"
          mr="30px"
          w="100px"
          h="max-content"
          src="https://www.redditstatic.com/accountmanager/bbb584033aa89e39bad69436c504c9bd.png"
          alt="Art"
          objectFit="cover"
        />
        <Box position="relative">
          <Button onClick={onClose} position="absolute" top="5" right="5">
            <RiCloseLine size={24} />
          </Button>
          <Box p={25}>{children}</Box>
        </Box>
      </Box>
    </>,
    portalDiv
  );
}
