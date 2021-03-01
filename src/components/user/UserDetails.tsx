//@ts-nocheck
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../../types";
import Container from "../common/Container";
import Following from "./user-modals/Following";
import Followers from "./user-modals/Followers";
import { followUser } from "../../api";
import { UserContext } from "../../context/UserContext";
import UserPicture from "./UserPicture";
import UserPictureButton from "./UserPictureButton";
import UserCover from "./UserCover";
import UserCoverButton from "./UserCoverButton";

export default function UserDetails({
  user,
  id,
}: {
  user: UserType;
  id: string;
}) {
  const [showFollowingModal, setShowFollowingModal] = useState<boolean>(false);
  const [showFollowersModal, setShowFollowersModal] = useState<boolean>(false);
  const [followed, setFollowed] = useState<boolean | undefined>(undefined);
  const loggedUser = useContext(UserContext);
  const toast = useToast();

  useEffect(() => {
    for (var i = 0; i < loggedUser?.following?.length; i++) {
      if (loggedUser?.following[i]?._id === id) {
        setFollowed(true);
        break;
      }
    }
  }, [loggedUser]);

  const handleFollow = async () => {
    const response = await followUser(id);
    if (response.statusText === "OK") {
      if (response.data === "follow") {
        setFollowed(true);
      } else {
        setFollowed(false);
      }
    } else if (response.data === "unfollow") {
      setFollowed(false);
    } else {
      toast({
        title: response.data,
        isClosable: true,
      });
    }
  };

  return (
    <Box pt={20} position="relative" display="flex" gridGap={50}>
      {user._id === loggedUser._id ? (
        <UserCoverButton user={user} />
      ) : (
        <UserCover user={user} />
      )}
      <Container position="relative" w="100%" my={5}>
        {user._id === loggedUser._id ? (
          <UserPictureButton image={user.image} />
        ) : (
          <UserPicture image={user.image} />
        )}
        <Flex
          m={5}
          justifyContent="space-between"
          w="100%"
          h="max-content"
          alignItems="center"
          mb="20px"
        >
          <Flex alignItems="center" gridGap={5}>
            <Text fontSize={42} fontWeight="bold">
              {user.username}
            </Text>
            <Button
              backgroundColor={!followed ? "#3C97B2" : "#EDF2F7"}
              color={!followed ? "white" : "#333"}
              _hover={{ backgroundColor: !followed ? "#317e96" : "#EDF2F7" }}
              _active={{}}
              onClick={handleFollow}
            >
              {!followed ? "Follow" : "Unfollow"}
            </Button>
          </Flex>
          <Flex gridGap={5}>
            <Button
              bg="none"
              _focus={{}}
              _hover={{}}
              _active={{}}
              name="followers"
              onClick={() => setShowFollowersModal(true)}
            >
              Followers: {user.followers.length}
            </Button>
            {showFollowersModal && (
              <Followers
                showModal={showFollowersModal}
                setShowModal={setShowFollowersModal}
                id={id}
              />
            )}
            <Button
              onClick={() => setShowFollowingModal(true)}
              bg="none"
              _focus={{}}
              _hover={{}}
              _active={{}}
              name="following"
            >
              Following: {user.following.length}
            </Button>
            {showFollowingModal && (
              <Following
                showModal={showFollowingModal}
                setShowModal={setShowFollowingModal}
                id={id}
              />
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
