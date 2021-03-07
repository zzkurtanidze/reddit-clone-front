//@ts-nocheck
import { Box, Divider, Flex, Grid, Link, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { CommunityType } from "../../types";
import StyledBox from "../common/StyledBox";

import NumberFormat from "react-number-format";
import PrimaryButton from "../common/PrimaryButton";
import { UserContext } from "../../context/UserContext";

import { FaUserCircle } from "react-icons/fa";
import { RiCake2Fill } from "react-icons/ri";

export default function CommunityInfo({
  community,
}: {
  community: CommunityType;
}) {
  const [joined, setJoined] = useState<boolean>(false);
  const user = useContext(UserContext);

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
      <Box bg="gray.800" w="100%" p="15px" py="17px">
        <Text color="white" fontSize={12}>
          ABOUT COMMUNITY
        </Text>
      </Box>
      <Box p="15px">
        <Text>{community.description}</Text>
        <Box mt="20px" fontFamily="mono" fontWeight="bold">
          <NumberFormat
            value={community.members.length}
            displayType="text"
            thousandSeparator={true}
          />
          <Text fontSize={12}>Members</Text>
        </Box>
        <br />
        <Divider />
        <br />
        <Flex gridGap={2} alignItems="center">
          <RiCake2Fill />
          Created {community.createdAt}
        </Flex>
        <Flex gridGap={2} alignItems="center" mt={3}>
          <FaUserCircle />
          By
          <Link href={`/user/${community.createdBy.username}`}>
            {community.createdBy.username}
          </Link>
        </Flex>
        {joined && (
          <>
            <Grid mt={5}>
              <PrimaryButton
                label="Create a post"
                onClick={() => window.location.replace("/submit")}
              />
            </Grid>
          </>
        )}
      </Box>
    </StyledBox>
  );
}
