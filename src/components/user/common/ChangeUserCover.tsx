import { useToast } from "@chakra-ui/toast";
import React, { useCallback } from "react";
import { updateUser, uploadImage } from "../../../api";
import ChangePicture from "../user-modals/ChangePicture";

export default function ChangeUserCover({
  showCoverChangeModal,
  setShowCoverChangeModal,
}: {
  showCoverChangeModal: boolean;
  setShowCoverChangeModal: Function;
}) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showCoverChangeModal ? (
    <ChangePicture
      open={showCoverChangeModal}
      onClose={() => setShowCoverChangeModal(false)}
      onDrop={onDrop}
    />
  ) : (
    <></>
  );
}
