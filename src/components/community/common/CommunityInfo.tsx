//@ts-nocheck
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { CommunityType } from "../../../types";
import StyledBox from "../../common/StyledBox";

import PrimaryButton from "../../common/PrimaryButton";
import { UserContext } from "../../../context/UserContext";

import { FaUserCircle } from "react-icons/fa";
import { RiCake2Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

import { Link } from "react-router-dom";
import { getRoleInCommunity } from "@api/";
import CommunityDescription from "./CommunityDescription";

export default function CommunityInfo({
  community,
}: {
  community: CommunityType;
}) {
  const [joined, setJoined] = useState<boolean>(false);
  const user = useContext(UserContext);
  const { role } = getRoleInCommunity(community.username);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (user?.joined) {
      user.joined.forEach((joinedCommunity) => {
        if (joinedCommunity._id === community._id) {
          setJoined(true);
        }
      });
    }
  }, [user]);

  return (
    <StyledBox p={0} h="max-content">
      <Flex
        justifyContent="space-between"
        bg="blue.500"
        w="100%"
        px="15px"
        py="13px"
      >
        <Text color="white" fontWeight="bold" fontSize={12}>
          About Community
        </Text>
        {role === "admin" && (
          <Button
            p="2px"
            h="max-content"
            fontSize={12}
            bg="transparent"
            _hover={{}}
            _focus={{}}
            _active={{}}
            color="white"
            textTransform="uppercase"
            fontFamily="mono"
          >
            <Link to={`/r/${community.username}/about/modqueue`}>Mod Tool</Link>
          </Button>
        )}
      </Flex>
      <Box p="15px">
        <CommunityDescription role={role} community={community} />
        <Box mt="20px" fontFamily="mono" fontWeight="bold">
          <Text>{community.membersCount}</Text>
          <Text fontSize={12}>Members</Text>
        </Box>
        <br />
        <Divider />
        <br />
        <Flex gridGap={2} alignItems="center">
          <RiCake2Fill />
          Created {community.createdAt}
        </Flex>
        {community.createdBy && (
          <Flex gridGap={2} alignItems="center" mt={3}>
            <FaUserCircle />
            By
            <Link to={`/user/${community.createdBy.username}`}>
              {community.createdBy.username}
            </Link>
          </Flex>
        )}
        {joined && (
          <>
            <Grid mt={5}>
              <PrimaryButton
                label="Create a post"
                onClick={() =>
                  window.location.replace(`/${community.username}/submit`)
                }
              />
            </Grid>
          </>
        )}
      </Box>
    </StyledBox>
  );
}
