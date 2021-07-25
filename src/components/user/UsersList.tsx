import React, { ReactElement, useRef, useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";

export function UsersList({
  setSearchTerm,
  children,
}: {
  setSearchTerm: Function;
  children: any;
}): ReactElement | null {
  const formRef: any = useRef();
return (
    <Box
      w="100%"
      h="max-content"
      my={15}
      borderRadius="5px"
      overflow="hidden"
      bg="gray.100"
    >
      <Box bg="gray.200" py="10px" px="15px">
        <Input
          //@ts-ignore
          ref={formRef}
          name="search"
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
          onClick={() => setSearchTerm(formRef?.current?.value)}
          _hover={{}}
          _active={{}}
          _focus={{}}
        >
          <BiSearchAlt color="white" size={20} />
        </Button>
      </Box>
      <Box bg="white" pt="5px">
        {children}
      </Box>
    </Box>
  );
}
