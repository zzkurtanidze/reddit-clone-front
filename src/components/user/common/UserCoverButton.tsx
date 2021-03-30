import { Box, Button, Text, useToast } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { updateUser, uploadImage } from "../../../api";
import { UserType } from "../../../types";
import ChangePicture from "../user-modals/ChangePicture";
import ChangeUserCover from "./ChangeUserCover";
import UserCover from "./UserCover";

export default function UserCoverButton({ user }: { user: UserType }) {
  const [showCoverChangeModal, setShowCoverChangeModal] = useState<boolean>(
    false
  );
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
        zIndex={4}
        onClick={() => setShowCoverChangeModal(true)}
        _hover={{
          background: "gray.100",
          color: "gray.800",
        }}
      >
        <FaRegEdit />
      </Button>
      <ChangeUserCover
        showCoverChangeModal={showCoverChangeModal}
        setShowCoverChangeModal={setShowCoverChangeModal}
      />
    </Box>
  );
}
