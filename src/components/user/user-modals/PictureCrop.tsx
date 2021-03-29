import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { Cropper } from "react-cropper";
import Modal from "../../Modal";

export default function PictureCrop({
  open,
  onClose,
  imageUrl,
  handleSubmit,
  onInitialized,
}: {
  open: boolean;
  onClose: Function;
  imageUrl: string;
  handleSubmit: () => {};
  onInitialized: (instance: any) => void;
}) {
  return (
    <Modal open={open} onClose={() => onClose()}>
      <Box mt={10}>
        <Cropper
          src={imageUrl}
          initialAspectRatio={1 / 1}
          aspectRatio={1 / 1}
          minCropBoxHeight={150}
          onInitialized={onInitialized}
        />
        <Button onClick={handleSubmit} mt={5}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
}
