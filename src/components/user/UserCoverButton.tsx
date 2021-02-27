import { Box, Button, Text, useToast } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { updateUser, uploadImage } from "../../api";
import { UserType } from "../../types";
import ChangePicture from "./user-modals/ChangePicture";
import UserCover from "./UserCover";

export default function UserCoverButton({ user }: { user: UserType }) {
  const [showCoverChangeModal, setShowCoverChangeModal] = useState<boolean>(
    false
  );

  const toast = useToast();

  const onDrop = useCallback(async (acceptedFiles: any) => {
    const data = new FormData();
    data.append("photo", acceptedFiles[0]);
    const response = await uploadImage(data);
    if (response.statusText === "OK") {
      await updateUser({ coverImage: response.data });
      window.location.reload();
    } else {
      toast({
        title: "Can not upload image",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, []);

  return (
    <Box>
      <UserCover user={user} />
      <Button
        position="absolute"
        top="69"
        right="5"
        fontSize={18}
        bg="none"
        overflow="hidden"
        color="white"
        fontWeight="bold"
        transition="0.5s all"
        onClick={() => setShowCoverChangeModal(true)}
        _hover={{
          _after: {
            content: '"Edit"',
            width: "max-content",
            display: "block",
            marginLeft: "5px",
          },
          background: "gray.800",
        }}
      >
        <FaRegEdit />
      </Button>
      {showCoverChangeModal && (
        <ChangePicture
          open={showCoverChangeModal}
          onClose={() => setShowCoverChangeModal(false)}
          onDrop={onDrop}
        />
      )}
    </Box>
  );
}
