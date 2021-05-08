//@ts-nocheck
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../../types";
import Container from "../common/Container";
import Following from "./user-modals/Following";
import Followers from "./user-modals/Followers";
import { followUser } from "../../api";
import { UserContext } from "../../context/UserContext";
import UserPicture from "./common/UserPicture";
import UserPictureButton from "./common/UserPictureButton";
import UserCover from "./common/UserCover";
import UserCoverButton from "./common/UserCoverButton";
import StyledBox from "@components/common/StyledBox";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { useHistory } from "react-router";

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
  const history = useHistory();

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
    <StyledBox p={0} position="relative">
      <Image src={user.coverImage} h="100px" objectFit="cover" />
      <Image
        src={user.image || "http://localhost:4000/static/avatar.png"}
        w="85px"
        h="85px"
        objectFit="cover"
        border="4px"
        borderColor="white"
        position="relative"
        marginTop="-55px"
        left="10px"
        borderRadius={5}
      />
      <Button
        bg="none"
        _hover={{}}
        _active={{}}
        _focus={{}}
        position="absolute"
        right="0px"
        top="100px"
        onClick={() => history.push("/settings/account")}
      >
        <IoIosSettings color="#0079D3" size={22} />
      </Button>
      <Box fontFamily="mono" py={2} px="10px">
        <Text fontSize={19} fontWeight="medium">
          {user.displayName}
        </Text>
        <Text fontSize={14} fontWeight="medium">
          u/{user.username}
        </Text>
        <Text fontSize={14} fontWeight="normal">
          {user.description}
        </Text>
        <Divider my={4} />
        <Text fontSize={14} fontWeight="semibold">
          Followers
        </Text>
        <Flex gridGap={1} alignItems="center">
          <FaUser color="#0079D3" size={12} />
          <Text fontSize={12} color="gray.500">
            {user.followers.length}
          </Text>
        </Flex>
      </Box>
    </StyledBox>
  );
}
