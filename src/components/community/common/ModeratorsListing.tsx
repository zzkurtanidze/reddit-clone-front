import { Button, ButtonGroup } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Divider, Grid, Text } from "@chakra-ui/layout";
import ErrorPage from "@pages/error";
//@ts-ignore
import { UserType } from "@types/";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
//@ts-ignore
import { CommunityType } from "@types/";
import { IoMdClose } from "react-icons/io";
//@ts-ignore
import { acceptModerator } from "@api/";
import { useToast } from "@chakra-ui/toast";

export default function ModeratorsListing({
  community,
  setSearchTerm,
  moderators,
}: {
  community: CommunityType;
  setSearchTerm?: Function;
  moderators: [UserType];
}) {
  const history = useHistory();
  const toast = useToast();

  return (
    <>
      {moderators && moderators.length > 0 ? (
        moderators.map((moderator: UserType) => (
          <React.Fragment key={moderator._id}>
            <Grid
              gridTemplateColumns="0.34fr 3fr 0.5fr"
              alignItems="center"
              w="90%"
              m="auto"
              my={3}
            >
              <ButtonGroup alignItems="center">
                <Button
                  display="grid"
                  gridTemplateColumns="1fr 2fr"
                  bg="0"
                  transition="0"
                  alignItems="center"
                  w="160px"
                  px="10px"
                  _hover={{}}
                  _active={{}}
                  _focus={{}}
                  onClick={() => history.push(`/user/${moderator.username}`)}
                >
                  <Image
                    src={
                      moderator.image ||
                      "http://localhost:4000/assets/avatar.png"
                    }
                    w="30px"
                    minW="30px"
                    h="30px"
                    minH="30px"
                    borderRadius={5}
                  />
                  <Text>{moderator.username}</Text>
                </Button>
              </ButtonGroup>
              <Text></Text>
              {community.moderators.includes(moderator) && (
                <Text fontSize={14} color="gray.600">
                  Full Permissions
                </Text>
              )}
              {community.invitedModerators.includes(moderator) && (
                <Button
                  bg="none"
                  _active={{}}
                  _focus={{}}
                  _hover={{}}
                  p={0}
                  ml="100px"
                  onClick={async () => {
                    await acceptModerator(community._id, false, moderator._id);
                    toast({
                      title: "Invite canceled succesfully",
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                    });
                    window.location.reload();
                  }}
                >
                  <IoMdClose size={25} />
                </Button>
              )}
            </Grid>
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <ErrorPage
          text={`No results`}
          button={
            <Button
              bg="none"
              color="blue.500"
              borderRadius={50}
              onClick={() => {
                history.push(`/r/${community.username}/about/moderators`);
                if (setSearchTerm) {
                  setSearchTerm("");
                }
              }}
            >
              See All
            </Button>
          }
          h="100%"
          p="50px"
          fontSize={16}
        />
      )}
    </>
  );
}
