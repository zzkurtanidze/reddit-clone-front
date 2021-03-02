//@ts-nocheck
import { Box, Button, Divider, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { CommunityType } from "../../types";
import StyledBox from "../common/StyledBox";

import NumberFormat from "react-number-format";
import { BiCake } from "react-icons/bi";
import { RiCake2Fill } from "react-icons/ri";
import PrimaryButton from "../common/PrimaryButton";

export default function CommunityInfo({
  community,
}: {
  community: CommunityType;
}) {
  return (
    <StyledBox w="70%" p={0} h="max-content">
      <Box bg="gray.800" w="100%" p="15px" py="20px">
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
          Created Apr 30, 2015
        </Flex>
        <Grid mt={5}>
          <PrimaryButton
            label="Create a post"
            onClick={() => window.location.replace("/submit")}
          />
        </Grid>
        <br />
        <Divider />
        <br />
      </Box>
    </StyledBox>
  );
}
