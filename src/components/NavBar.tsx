import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

import Logo from "../assets/reddit-logo.png";
import { BiSearchAlt } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { AiFillCaretDown } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

type NavLinkProps = {
  text: string;
  bg: string;
  color: string;
  href?: string;
};

export default function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("gray.100", "gray.600");

  return (
    <Flex
      w="100%"
      h="max-content"
      bg={bg}
      px={10}
      py={2}
      justifyContent="space-between"
    >
      <Link>
        <Image src={Logo} alt={"Reddit Logo"} w={100} />
      </Link>
      <InputGroup w="30%" mr="25%">
        <InputLeftElement>
          <BiSearchAlt color={"gray"} size={20} />
        </InputLeftElement>
        <Input type="text" bg={"white"} placeholder="Search" />
      </InputGroup>
      <HStack spacing="25px" alignSelf="center">
        <NavLink text="Log In" bg="white" color="#1384D7" />
        <NavLink text="Sign Up" bg="#1384D7" color="white" />
        <Button onClick={() => setIsExpanded(!isExpanded)}>
          <VscAccount color="gray" />
          <Box ml="10px">
            <AiFillCaretDown size={15} color="gray" />
          </Box>
        </Button>
        {isExpanded && (
          <Box
            w="12%"
            h="max-content"
            position="absolute"
            right="40px"
            top="45px"
            borderWidth="1px"
            borderColor="gray.200"
            bg="gray.100"
          >
            <Text
              fontSize="11px"
              fontWeight="bold"
              color="gray.500"
              letterSpacing="0.6px"
              textTransform="uppercase"
              px="15px"
              py="10px"
            >
              View Options
            </Text>
            <Flex
              w="100%"
              borderRadius="0"
              px="5px"
              py="10px"
              justifyContent="space-evenly"
              alignItems="center"
              cursor="pointer"
              _hover={{
                backgroundColor: "#1384D7",
                color: "white",
              }}
            >
              <FaMoon />
              Dark Mode
              <Switch onChange={toggleColorMode} />
            </Flex>
          </Box>
        )}
      </HStack>
    </Flex>
  );
}

const NavLink: React.FC<NavLinkProps> = ({
  text,
  bg,
  color,
  href,
  ...otherProps
}) => {
  return (
    <Link
      px="34px"
      py="5px"
      borderRadius="25px"
      color={color}
      bg={bg}
      fontWeight="bold"
      fontFamily="Noto Sans"
      _hover={{
        textDecor: "none",
      }}
      href={href}
      {...otherProps}
    >
      {text}
    </Link>
  );
};
