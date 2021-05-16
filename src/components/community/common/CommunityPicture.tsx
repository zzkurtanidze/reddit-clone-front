import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import Profile from "../../common/Profile";
import SVG from "react-inlinesvg";

import { Link } from "react-router-dom";
//@ts-ignore
import { getRoleInCommunity } from "@api/";
import UploadImage from "@assets/upload.svg";
//@ts-ignore
import { uploadImage } from "@api/";
//@ts-ignore
import { updateCommunity } from "@api/";
const randomColor = require("randomcolor");

export default function CommunityPicture({
  imageSrc,
  communityUsername,
  width = "80px",
  withLink = false,
  uploadButton = false,
  ...otherProps
}: {
  imageSrc: string;
  communityUsername: string;
  width?: string;
  withLink?: boolean;
  uploadButton?: boolean;
  [x: string]: any;
}) {
  const numWidth = parseInt(width.slice(0, width.length - 2));
  const { role } = getRoleInCommunity(communityUsername);

  const handleChange = async (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const data = new FormData();
      data.append("photo", e.target.files[0]);
      const response = await uploadImage(data);
      if (response.statusText === "OK") {
        const updateResponse = await updateCommunity(communityUsername, {
          image: response.data,
        });
        if (updateResponse.statusText === "OK") {
          window.location.reload();
        }
      }
    }
  };

  return (
    <Box {...otherProps}>
      {imageSrc && imageSrc !== "" ? (
        withLink ? (
          <Link to={`/r/${communityUsername}`}>
            <Profile imageSrc={imageSrc} width={width} />
          </Link>
        ) : (
          <>
            <Profile imageSrc={imageSrc} width={width} />
            {uploadButton && role === "admin" && (
              <>
                <Input
                  type="file"
                  id="upload"
                  display="none"
                  onChange={(e) => handleChange(e)}
                />
                <Button
                  bg="none"
                  p={0}
                  _hover={{}}
                  _active={{}}
                  _focus={{}}
                  fontSize="11.5px"
                  color="#0079D3"
                  h="max-content"
                  position="absolute"
                  left="50%"
                  transform="translateX(-50%)"
                  bottom="-17px"
                >
                  <label htmlFor="upload">Update icon</label>
                </Button>
              </>
            )}
          </>
        )
      ) : uploadButton && role === "admin" ? (
        <Flex
          direction="column"
          position="relative"
          justifyContent="center"
          gridGap={2}
          m={1}
        >
          <Input
            type="file"
            id="upload"
            display="none"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="upload">
            <Box
              bg="white"
              borderRadius={50}
              p="12px"
              border={`4px solid #0079D3`}
            >
              <SVG
                src={UploadImage}
                width="40px"
                height="40px"
                fill="#0079D3"
              />
            </Box>
            <Button
              bg="none"
              p={0}
              _hover={{}}
              _active={{}}
              _focus={{}}
              fontSize="11.5px"
              color="#0079D3"
              h="max-content"
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
              bottom="-17px"
            >
              Add icon
            </Button>
          </label>
        </Flex>
      ) : (
        <Box
          w={width}
          h={width}
          color="white"
          bg={randomColor()}
          fontSize={numWidth / 1.8}
          borderRadius="50%"
          display="grid"
          placeItems="center"
          userSelect="none"
          border={numWidth <= 70 ? "0" : `${numWidth / 15}px solid white`}
        >
          {communityUsername && (
            <Text textTransform="uppercase" lineHeight="0">
              {communityUsername[0]}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}
