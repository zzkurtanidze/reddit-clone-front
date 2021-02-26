import React from "react";
import { Button, Flex, Text, useColorModeValue, Link } from "@chakra-ui/react";

export const DropdownItem: React.FC<{
  title: string;
  icon?: any;
  onClick: Function;
}> = ({ title, icon, onClick }) => {
  return (
    <Button
      onClick={() => onClick()}
      p={0}
      borderRadius={0}
      bg="transparent"
      w="100%"
      _hover={{}}
      _active={{}}
      _focus={{}}
    >
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
    </Button>
  );
};

export const DropdownLink: React.FC<{
  title: string;
  icon: any;
  href: string;
}> = ({ title, icon, href }) => {
  return (
    <Link _hover={{}} _focus={{}} href={href}>
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
        <Text fontWeight="bold" ml="13px" fontSize={14}>
          {title}
        </Text>
      </Flex>
    </Link>
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
