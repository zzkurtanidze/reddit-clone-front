import { Box, Button, useToast } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { updateUser, uploadImage } from "../../../api";
import ChangePicture from "../user-modals/ChangePicture";
import UserPicture from "./UserPicture";
import Cropper from "react-cropper";
import Modal from "../../Modal";
var toBlob = require("canvas-to-blob");

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
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [cropper, setCropper] = useState<any>();

  const toast = useToast();

  const onDrop = useCallback(async (acceptedFiles: any) => {
    const data = new FormData();
    data.append("photo", acceptedFiles[0]);
    const response = await uploadImage(data);
    if (response.statusText === "OK") {
      const image = new Image();
      image.src = response.data;
      image.onload = async function () {
        if (image.width - image.height < 100) {
          await updateUser({ image: response.data });
          window.location.reload();
        } else {
          setShowCropper(true);
          setImageUrl(response.data);
        }
      };
    } else {
      toast({
        title: "Can not upload image",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, []);

  const handleSubmit = async () => {
    var img = cropper.getCroppedCanvas().toDataURL("image/jpeg", 0.5);
    var file = toBlob(img);

    const data = new FormData();
    const date = new Date().getTime().toString();
    if (file) {
      data.append("photo", file, date + ".jpg");
      const response = await uploadImage(data);
      if (response.statusText === "OK") {
        await updateUser({ image: response.data });
        window.location.reload();
      }
    }
  };

  return (
    <Box
      position="relative"
      width={width}
      height={width}
      overflow="hidden"
      borderRadius="10px"
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
      {showProfileChangeModal && (
        <ChangePicture
          open={showProfileChangeModal}
          onClose={() => setShowProfileChangeModal(false)}
          onDrop={onDrop}
        />
      )}
      {showCropper && (
        <Modal open={showCropper} onClose={() => setShowCropper(false)}>
          <Box mt={10}>
            <Cropper
              src={imageUrl}
              initialAspectRatio={1 / 1}
              aspectRatio={1 / 1}
              minCropBoxHeight={150}
              onInitialized={(instance) => setCropper(instance)}
            />
            <Button onClick={handleSubmit} mt={5}>
              Submit
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
