import { Flex, Link, Text } from "@chakra-ui/react";
import React, { Component } from "react";

export const PostButton: any = ({
  icon,
  label,
}: {
  icon?: Component;
  label: string;
}) => {
  return (
    <Flex>
      <Link
        mx="5px"
        px="5px"
        py="5px"
        borderRadius={3}
        _hover={{
          backgroundColor: "gray.300",
        }}
      >
        <Flex h="max-content" alignItems="center" fontSize={12} gridGap="5px">
          {icon && icon}
          <Text fontWeight="bold" color="#808080">
            {label}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};
