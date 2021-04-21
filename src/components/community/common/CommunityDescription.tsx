//@ts-ignore
import { updateCommunity } from "@api/";
import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
//@ts-ignore
import { CommunityType } from "@types/";
import React, { useState, useRef, useEffect } from "react";
import { MdEdit } from "react-icons/md";

export default function CommunityDescription({
  role,
  community,
}: {
  role: string;
  community: CommunityType;
}) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState(community.description);

  const textareaRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    if (textareaRef && textareaRef?.current) {
      //@ts-ignore
      textareaRef.current.style.height = "0px";
      //@ts-ignore
      const scrollHeight = textareaRef.current.scrollHeight;
      //@ts-ignore
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);

  const handleSave = async () => {
    const response = await updateCommunity(community.username, {
      description: value,
    });
    if (response.statusText === "OK") {
      toast({
        title: `r/${community.username} description updated succesfully`,
        status: "success",
        isClosable: true,
      });
      setEditMode(false);
    }
  };

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
          {value}
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
          onChange={(e) => setValue(e.target.value)}
          ref={textareaRef}
        >
          {value}
        </Textarea>
        <Box float="right">
          <Button
            _hover={{}}
            _focus={{}}
            _active={{}}
            bg="none"
            color="#f72020"
            fontSize={12}
            fontFamily="mono"
            fontWeight="bold"
            px={1}
            pl={2}
            onClick={() => {
              setEditMode(false);
              setValue(community.description);
            }}
          >
            Close
          </Button>
          <Button
            _hover={{}}
            _focus={{}}
            _active={{}}
            bg="none"
            color="#0079D3"
            fontSize={12}
            fontFamily="mono"
            fontWeight="bold"
            px={1}
            onClick={() => handleSave()}
          >
            Save
          </Button>
        </Box>
        <Box style={{ clear: "both" }}></Box>
      </Box>
    )
  ) : (
    <Text fontSize={14}>{community.description}</Text>
  );
}
