//@ts-nocheck
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { UserType } from "../../types";
import Container from "../common/Container";

export default function UserDetails({ user }: { user: UserType }) {
  return (
    <>
      <Box pt={20} position="relative" display="flex" gridGap={50}>
        <Box boxShadow="inset 0 0 10px #000000" position="absolute" top="0">
          <Image
            src={
              user.cover
                ? user.cover
                : "https://www.zipjob.com/blog/wp-content/uploads/2020/08/linkedin-default-background-cover-photo-1.png"
            }
            alt="profile-cover"
            w="100vw"
            h="200px"
            zIndex={-1}
            objectFit="cover"
          />
        </Box>
        <Container position="relative" top="-50px">
          <Image
            src={
              user.image
                ? user.image
                : "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg"
            }
            w="200px"
            boxShadow="2px 2px 10px rgba(0,0,0,.2)"
            borderRadius="50%"
            alt="profile-picture"
          />
          <Box m={5}>
            <Text fontSize={42} fontWeight="bold" mb="20px">
              {user.username}
            </Text>
          </Box>
        </Container>
      </Box>
    </>
  );
}
