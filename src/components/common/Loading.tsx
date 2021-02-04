import { Box } from "@chakra-ui/react";
import React from "react";
import { SyncLoader } from "react-spinners";

export default function Loading() {
  return (
    <Box position="fixed" w="100vw" h="100vh" top="0" left="0">
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <SyncLoader size={18} color="#FB4729" loading={true} />
      </Box>
    </Box>
  );
}
