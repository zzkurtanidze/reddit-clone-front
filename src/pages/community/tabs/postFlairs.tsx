//@ts-ignore
import { getFlairs } from "@api/";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/table";
//@ts-ignore
import { CommunityType } from "@types/";
import React from "react";

export default function PostFlairs({
  community,
}: {
  community: CommunityType;
}) {
  const { flairs, isLoading } = getFlairs(community.username);

  return (
    <Box mt="60px" p={10}>
      <Text fontFamily="mono" fontWeight="medium" fontSize={22}>
        Post flair management
      </Text>
      <Table borderRadius={4} mt="50px">
        <Thead bg="#F6F7F8">
          <Tr
            fontSize={12}
            fontWeight="bold"
            fontFamily="mono"
            color="gray.500"
            textTransform="uppercase"
          >
            <Td w="35%">Post Flair Preview</Td>
            <Td w="10%">Css Class</Td>
            <Td w="40%">Settings</Td>
            <Td>Flair ID</Td>
          </Tr>
        </Thead>
      </Table>
      <Flex
        placeItems="center"
        justifyContent="center"
        direction="column"
        bg="white"
        w="100%"
        minH="400px"
        gridGap={3}
      >
        <Image src="http://localhost:4000/assets/label.svg" w="50px" h="50px" />
        <Text fontFamily="mono" fontSize={22} fontWeight="medium">
          You do not have any post flair
        </Text>
        <Text fontFamily="mono" fontSize={14} fontWeight="medium">
          Create post flair in your community today
        </Text>
      </Flex>
    </Box>
  );
}
