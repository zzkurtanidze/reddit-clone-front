import React from "react";
import { Text, Box, Flex, Table, Thead, Grid, Tr } from "@chakra-ui/react";
//@ts-ignore
import { CommunityType } from "@types/";
import PrimaryButton from "@components/common/PrimaryButton";
import {ImHammer2} from "react-icons/im";

export default function BannedUsers({
  community,
}: {
  community: CommunityType;
}) {
  return (
    <Box>
      <Flex w="100%" h="max-content" bg="#EDEFF1" p={2} alignItems="center" justifyContent="flex-end" gridGap={5}>
        <PrimaryButton
          label="Ban user"
          onClick={() => console.log("test")}
        />
      </Flex>
      <Box p={10}>
        <Text fontSize={22} fontFamily="mono" fontWeight="medium">Banned users</Text>
        {community && community.banned.length < 1 ? (
          <Flex direction="column"  w="100%" h="40vh" bg="white" borderRadius={5} justifyContent="center" alignItems="center" gridGap={10} mt={5}>
            <ImHammer2 color="gray" fontSize={30}/>
            <Text fontFamily="mono" fontSize={20} fontWeight="medium" color="gray.500">No banned users in r/{community.username}</Text> 
          </Flex>
        ) : (
        <Table>
          <Thead>
            <Tr></Tr>
          </Thead>
        </Table>
        )}
      </Box>
    </Box>
  );
}
