//@ts-nocheck
import { Box, Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../../types";
import Container from "../common/Container";
import Following from "./user-modals/Following";
import Followers from "./user-modals/Followers";
import { followUser } from "../../api";
import { UserContext } from "../../context/UserContext";
import UserPicture from "./UserPicture";

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
      <Box position="absolute" top="0">
        <Image
          src={
            user.cover
              ? user.cover
              : "https://www.zipjob.com/blog/wp-content/uploads/2020/08/linkedin-default-background-cover-photo-1.png"
          }
          alt="profile-cover"
          w="100vw"
          h="200px"
          zIndex={-5}
          objectFit="cover"
          className="user-image"
        />
      </Box>
      <Container position="relative" top="-50px" w="100%">
        <UserPicture image={user.image} />
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
        <Box m={5}>
          <Text>Liked Posts: {user.likedPosts.length}</Text>
        </Box>
      </Container>
    </Box>
  );
}
