//@ts-ignore
import { getCommunity } from "@api/";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import Container from "@components/common/Container";
import Loading from "@components/common/Loading";
import UserPicture from "@components/user/common/UserPicture";
//@ts-ignore
import { UserType } from "@types/";
import React from "react";
import { BiSearchAlt } from "react-icons/bi";

export default function ModeratorsPage({ match }: { match: any }) {
  const communityName = match.params.name;
  const { community, isLoading } = getCommunity(communityName);

  if (isLoading) return <Loading />;
  return (
    <Container mx="3%" my="11%">
      <Text fontSize={18} fontFamily="mono" fontWeight="medium">
        Moderators of r/{community.username}
      </Text>
      <Box
        w="100%"
        h="max-content"
        mt={15}
        borderRadius="5px"
        overflow="hidden"
        bg="gray.100"
      >
        <Box bg="gray.200" py="10px" px="15px">
          <Input
            w="17vw"
            h="35px"
            py={0}
            type="text"
            bg="white"
            placeholder="Search for user"
            fontSize={14}
            borderWidth="1px"
            borderColor="gray.600"
            _focus={{}}
            _hover={{}}
          />
          <Button
            p="0"
            bg="gray.600"
            borderRadius={0}
            borderRightRadius="5px"
            w="35px"
            h="34px"
            position="relative"
            top="-1px"
            zIndex={1}
            right="40px"
            _hover={{}}
            _active={{}}
            _focus={{}}
          >
            <BiSearchAlt color="white" size={20} />
          </Button>
        </Box>
        <Box bg="white" px="15px" py="10px">
          {community.moderators &&
            community.moderators.map((moderator: UserType) => (
              <Grid
                gridTemplateColumns="0.14fr 0.1fr 3fr 0.5fr"
                alignItems="center"
                w="90%"
                m="auto"
                key={moderator._id}
              >
                <Image
                  src={moderator.image}
                  w="30px"
                  h="30px"
                  borderRadius={5}
                />
                <Text>{moderator.username}</Text>
                <Text></Text>
                <Text fontSize={14} color="gray.600">
                  Full Permissions
                </Text>
              </Grid>
            ))}
        </Box>
      </Box>
    </Container>
  );
}
