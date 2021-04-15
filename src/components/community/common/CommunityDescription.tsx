import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
//@ts-ignore
import { CommunityType } from "@types/";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

export default function CommunityDescription({
  role,
  community,
}: {
  role: string;
  community: CommunityType;
}) {
  const [editMode, setEditMode] = useState<boolean>(false);

  return role === "admin" ? (
    !editMode ? (
      <Button
        bg="none"
        w="100%"
        whiteSpace="normal"
        h="max-content"
        py={1}
        px={2}
        textAlign="left"
        _hover={{ border: "1px solid #0079D3" }}
        _active={{}}
        _focus={{}}
        display="inline"
        onClick={() => setEditMode(true)}
      >
        <Text display="inline" fontSize={14}>
          {community.description}
        </Text>
        <Box display="inline-block" position="relative" left="2px" top="2px">
          <MdEdit color="#0079D3" size={16} />{" "}
        </Box>
      </Button>
    ) : (
      <Box bg="gray.100" py="2px" borderRadius={10} border="1px solid #0079D3">
        <Textarea
          fontSize={14}
          fontFamily="mono"
          fontWeight="bold"
          _focus={{}}
          _hover={{}}
          _active={{}}
          border="0"
          py={1}
          px={2}
          h="fit-content"
        >
          {community.description}
        </Textarea>
        <Button
          _hover={{}}
          _focus={{}}
          _active={{}}
          bg="none"
          color="#0079D3"
          fontSize={12}
          fontFamily="mono"
          onClick={() => setEditMode(false)}
        >
          Close
        </Button>
      </Box>
    )
  ) : (
    <Text fontSize={14}>{community.description}</Text>
  );
}
