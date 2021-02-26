import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Callback } from "yup/lib/types";
import Modal from "../../Modal";

export default function ChangePicture({
  open,
  onClose,
  onDrop,
}: {
  open: boolean;
  onClose: Function;
  onDrop: any;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Modal open={open} onClose={onClose}>
      <Box textAlign="center" mt={10}>
        <Text fontSize={17} fontWeight="bold">
          Upload new profile picture
        </Text>
      </Box>
      <div {...getRootProps()}>
        <Flex
          position="relative"
          mt={5}
          justifyContent="center"
          alignItems="center"
          h="200px"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </Flex>
      </div>
    </Modal>
  );
}
