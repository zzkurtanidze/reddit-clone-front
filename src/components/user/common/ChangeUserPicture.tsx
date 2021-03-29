import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import React, { useCallback, useState } from "react";
import { Cropper } from "react-cropper";
import { updateUser, uploadImage } from "../../../api";
import Modal from "../../Modal";
import ChangePicture from "../user-modals/ChangePicture";
var toBlob = require("canvas-to-blob");

export default function ChangeUserPicture({
  showProfileChangeModal,
  setShowProfileChangeModal,
}: {
  showProfileChangeModal: boolean;
  setShowProfileChangeModal: Function;
}) {
  const [showCropper, setShowCropper] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
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
          if (setImageUrl) {
            setImageUrl(response.data);
          }
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
    <>
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
    </>
  );
}
