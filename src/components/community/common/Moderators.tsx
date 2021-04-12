import { Box, Text } from "@chakra-ui/layout";
import SecondaryButton from "@components/common/SecondaryButton";
import StyledBox from "@components/common/StyledBox";
//@ts-ignore
import { UserType } from "@types/";
import React from "react";
import { AiFillMessage } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Moderators({
  moderators,
  communityUsername,
}: {
  moderators: UserType;
  communityUsername: string;
}) {
  return (
    <StyledBox
      position="relative"
      title="Moderators"
      titleBackground="blue.500"
    >
      <SecondaryButton
        color="blue.500"
        label="Message the mods"
        icon={<AiFillMessage />}
        onClick={() => console.log("hey")}
        w="100%"
        h="max-content"
        py="7px"
      />
      <Box mt={4}>
        {moderators &&
          moderators.map((moderator: UserType) => (
            <Text
              color="blue.500"
              fontSize={14}
              fontFamily="mono"
              fontWeight="medium"
            >
              <Link to={`/user/${moderator.username}`}>
                u/{moderator.username}
              </Link>
            </Text>
          ))}
      </Box>
      <br />
      <Text
        color="blue.500"
        position="absolute"
        fontSize={14}
        fontWeight="bold"
        fontFamily="mono"
        bottom="10px"
        right="10px"
      >
        <Link to={`/r/${communityUsername}/about/moderators`}>
          VIEW ALL MODERATORS
        </Link>
      </Text>
    </StyledBox>
  );
}
