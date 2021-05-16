import { Button } from "@chakra-ui/button";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import Container from "@components/common/Container";
import PrimaryButton from "@components/common/PrimaryButton";
import React from "react";
import { CgNotes } from "react-icons/cg";

export default function RulesTab() {
  return (
    <Box>
      <Flex
        justifyContent="flex-end"
        w="100%"
        h="max-content"
        mt="60px"
        p={2}
        bg="#EDEFF1"
      >
        <PrimaryButton
          label="Add Rule"
          onClick={() => console.log("test")}
          borderRadius={50}
          px={4}
        />
      </Flex>
      <Box mx="2%" mt="20px">
        <Text fontFamily="mono" fontSize={20} fontWeight="bold">
          Rules
        </Text>
        <Flex
          w="100%"
          minH="300px"
          bg="white"
          borderRadius={5}
          mt={5}
          direction="column"
          justifyContent="center"
          placeItems="center"
          gridGap={10}
        >
          <CgNotes color="gray" size={27} />
          <Text
            color="gray"
            fontSize={18}
            fontWeight="semibold"
            fontFamily="mono"
          >
            No rules yet
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
