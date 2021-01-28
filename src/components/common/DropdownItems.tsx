import React from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

export const DropdownItem: React.FC<{
  title: string;
  icon?: any;
}> = ({ title, icon }) => {
  return (
    <Flex
      w="100%"
      borderRadius="0"
      px="20px"
      py="10px"
      justifyContent="flex-start"
      alignItems="center"
      cursor="pointer"
      _hover={{
        backgroundColor: "#1384D7",
        color: "white",
      }}
    >
      {icon && icon}
      <Text fontSize={14} ml="13px">
        {title}
      </Text>
    </Flex>
  );
};

export const DropdownTitle: React.FC<{
  label: string;
}> = ({ label }) => {
  const popUpText = useColorModeValue("gray.500", "white");

  return (
    <Text
      fontSize="11px"
      fontWeight="bold"
      color={popUpText}
      letterSpacing="0.6px"
      textTransform="uppercase"
      px="15px"
      py="10px"
    >
      {label}
    </Text>
  );
};

export const CustomDropdownItem: React.FC<{
  icon?: any;
  title: string;
  children: JSX.Element;
}> = ({ icon, title, children }) => {
  return (
    <Flex
      w="100%"
      borderRadius="0"
      px="20px"
      py="10px"
      justifyContent="space-between"
      alignItems="center"
      cursor="pointer"
      _hover={{
        backgroundColor: "#1384D7",
        color: "white",
      }}
    >
      {icon && icon}
      <Text fontSize={14} ml="13px">
        {title}
      </Text>
      {children}
    </Flex>
  );
};
