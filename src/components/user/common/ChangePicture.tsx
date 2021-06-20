/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { UserRoleContext } from "@context/UserRoleContext";
import React, { useCallback, useContext, useState } from "react";
import { Cropper } from "react-cropper";
import { FaEdit } from "react-icons/fa";
import { updateUser, uploadImage } from "../../../api";
import Modal from "../../Modal";
var toBlob = require("canvas-to-blob");

export default function ChangePicture({
  image,
  name,
  ...rest
}: {
  image: string;
  name: string;
  [x: string]: any;
}) {
  const [showCropper, setShowCropper] = useState(false);
  const [cropper, setCropper] = useState<any>();
  const { role } = useContext(UserRoleContext);

  const toast = useToast();

  const onDrop = useCallback(async (e: any) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("photo", file);
    const response = await uploadImage(data);
    if (response.statusText === "OK") {
      console.log(name);
      await updateUser({ [name]: response.data });
      //window.location.reload();
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
        await updateUser({ [name]: response.data });
        window.location.reload();
      }
    }
  };

  return (
    <>
      <Box
        w="max-content"
        position="relative"
        borderRadius="5px"
        border="5px solid white"
        {...rest}
      >
        <Image src={image} w="100%" h="100%" objectFit="cover" />
        {role === "admin" && (
          <>
            <Input
              type="file"
              display="none"
              id="file-input"
              onChange={onDrop}
            />
            <label htmlFor="file-input">
              <Text
                position="absolute"
                cursor="pointer"
                bottom="7px"
                right="7px"
                p="10px"
                bg="white"
                border="1px solid #0079D3"
                borderRadius={50}
              >
                <FaEdit color="#0079D3" />
              </Text>
            </label>
          </>
        )}
      </Box>
      {showCropper && (
        <Modal open={showCropper} onClose={() => setShowCropper(false)}>
          <Box mt={10}>
            <Cropper
              src={image}
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
