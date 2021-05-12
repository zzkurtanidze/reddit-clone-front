//@ts-nocheck
import { Box, Button, Divider, Flex, Grid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { UserType } from "../../types";
import StyledBox from "@components/common/StyledBox";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { useHistory } from "react-router";
import PrimaryButton from "@components/common/PrimaryButton";
import ChangePicture from "./common/ChangePicture";
import { MdCake } from "react-icons/md";

export default function UserDetails({
  user,
  id,
}: {
  user: UserType;
  id: string;
}) {
  const history = useHistory();
  const [cakeDay, setCakeDay] = useState();

  useEffect(() => {
    const timestamp = user.cakeDay * 1000;
    const date = new Date(timestamp);

    const month = date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    });
    const year = date.toLocaleString("en-US", { year: "numeric" });
    setCakeDay(month + ", " + year);
  }, []);

  return (
    <StyledBox p={0} position="relative">
      <ChangePicture
        image={user.coverImage}
        maxW="325px"
        name="coverImage"
        h="100px"
        border="0"
      />
      <ChangePicture
        image={user.image || "http://localhost:4000/assets/avatar.png"}
        name="image"
        top="-45px"
        left="10px"
        maxW="100px"
        maxH="100px"
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
        <Grid gridTemplateColumns="1fr 1fr">
          <Box>
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
          <Box>
            <Text fontSize={14} fontWeight="semibold">
              Cake Day
            </Text>
            <Flex gridGap={1} alignItems="center">
              <MdCake color="#0079D3" size={14} />
              <Text fontSize={12} color="gray.500">
                {cakeDay}
              </Text>
            </Flex>
          </Box>
        </Grid>
        <PrimaryButton
          label="New Post"
          borderRadius={50}
          w="100%"
          my={4}
          onClick={() => history.push("/submit/")}
        />
      </Box>
    </StyledBox>
  );
}
