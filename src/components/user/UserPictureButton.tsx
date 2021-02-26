import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import UserPicture from "./UserPicture";

export default function UserPictureButton({
  image,
  width = "200px",
}: {
  image: string | undefined;
  width?: string;
}) {
  return (
    <Box
      position="relative"
      width={width}
      height={width}
      overflow="hidden"
      borderRadius="50%"
    >
      <UserPicture image={image} width={width} />
      <Button
        bg="none"
        position="absolute"
        bottom="-25%"
        left="50%"
        transform="translateX(-50%)"
        _focus={{}}
        _hover={{ bottom: 0, backgroundColor: "rgba(0,0,0,.7)" }}
        _active={{}}
        color="white"
        pt="22%"
        pb="22%"
        px="50%"
      >
        <FaRegEdit size={18} />
      </Button>
    </Box>
  );
}
