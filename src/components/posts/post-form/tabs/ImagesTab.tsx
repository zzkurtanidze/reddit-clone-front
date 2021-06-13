/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../../../../api";

export default function ImagesTab({
  post,
  onChange,
  value,
}: {
  post: {
    title: string;
    body: string;
    image: string;
    postedTo: string;
  };
  onChange: Function;
  value?: any;
}) {
  const [imageName, setImageName] = useState<string>("");
  const toast = useToast();

  useEffect(() => {
    if (post.image) {
      let split = post.image.split("/");
      setImageName(split[split.length - 1]);
    }
  }, []);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    const data = new FormData();
    data.append("photo", acceptedFiles[0]);
    const response = await uploadImage(data);
    if (response.statusText === "OK") {
      setImageName(acceptedFiles[0].name);
      onChange(response.data);
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
    <div {...getRootProps()}>
      <Flex
        position="relative"
        mt={5}
        justifyContent="center"
        alignItems="center"
        h="200px"
      >
        {!post.image ? (
          <>
            <input value={value} {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </>
        ) : (
          <Flex direction="column">
            <h2>{imageName}</h2>
            <label htmlFor="reupload">
              <Button
                position="absolute"
                bottom="10px"
                left="50%"
                transform="translateX(-50%)"
                bg="#0079D3"
                color="white"
                _hover={{}}
                _active={{}}
                __focus={{}}
              >
                Reupload
              </Button>
            </label>
            <Input
              position="absolute"
              id="reupload"
              type="file"
              opacity="0"
              bottom="5px"
              onChange={(e) => onDrop(e.target.files)}
              left="50%"
              transform="translateX(-50%)"
            />
          </Flex>
        )}
      </Flex>
    </div>
  );
}
