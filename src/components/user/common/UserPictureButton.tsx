import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import UserPicture from "./UserPicture";
import ChangeUserPicture from "./ChangeUserPicture";

export default function UserPictureButton({
  image,
  width = "200px",
}: {
  image: string | undefined;
  width?: string;
}) {
  const [showProfileChangeModal, setShowProfileChangeModal] = useState<boolean>(
    false
  );

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
        bottom="-30%"
        left="50%"
        transform="translateX(-50%)"
        _focus={{}}
        _hover={{
          bottom: 0,
          backgroundColor: "rgba(0,0,0,.7)",
          boxShadow: "0 -10px 100px rgba(0,0,0)",
        }}
        _active={{}}
        zIndex={4}
        color="white"
        pt="22%"
        pb="22%"
        px="50%"
        onClick={() => setShowProfileChangeModal(!showProfileChangeModal)}
      >
        <FaRegEdit size={18} />
      </Button>
      <ChangeUserPicture
        showProfileChangeModal={showProfileChangeModal}
        setShowProfileChangeModal={setShowProfileChangeModal}
      />
    </Box>
  );
}
