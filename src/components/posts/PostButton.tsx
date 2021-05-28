import { Button, Flex, Text } from "@chakra-ui/react";
import React, { Component } from "react";

export const PostButton: any = ({
  icon,
  label,
  onClick,
}: {
  icon?: Component;
  label?: string;
  onClick?: any;
}) => {
  return (
    <Flex>
      <Button
        bg="none"
        h="max-content"
        w="max-content"
        mx="5px"
        px={0}
        py="5px"
        borderRadius={3}
        _focus={{}}
        _active={{}}
        _hover={{
          backgroundColor: "#E7E7E7",
        }}
        onClick={onClick ? onClick : () => {}}
      >
        <Flex
          h="max-content"
          alignItems="center"
          fontSize={12}
          gridGap="5px"
          px="10px"
        >
          {icon && icon}
          {label && (
            <Text fontWeight="bold" color="#808080">
              {label}
            </Text>
          )}
        </Flex>
      </Button>
    </Flex>
  );
};
