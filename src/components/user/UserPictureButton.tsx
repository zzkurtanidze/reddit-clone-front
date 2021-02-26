import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaRegEdit } from "react-icons/fa";
import { updateUser, uploadImage } from "../../api";
import Modal from "../Modal";
import UserPicture from "./UserPicture";

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

  const toast = useToast();

  const onDrop = useCallback(async (acceptedFiles: any) => {
    const data = new FormData();
    data.append("photo", acceptedFiles[0]);
    const response = await uploadImage(data);
    if (response.statusText === "OK") {
      await updateUser({ image: response.data });
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
        borderBottomRadius="100%"
        onClick={() => setShowProfileChangeModal(!showProfileChangeModal)}
      >
        <FaRegEdit size={18} />
      </Button>
      {showProfileChangeModal && (
        <Modal
          open={showProfileChangeModal}
          onClose={() => setShowProfileChangeModal(false)}
        >
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
      )}
    </Box>
  );
}
