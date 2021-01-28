/* eslint-disable react-hooks/rules-of-hooks */
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
import React, { useEffect, useState } from "react";

import Logo from "../assets/reddit-logo.png";

import { BiSearchAlt } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { AiFillCaretDown } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import LoginModal from "./form-modals/LoginModal";
import RegisterModal from "./form-modals/register/RegisterModal";
import { getUser } from "../api/index";
import { UserType } from "../types/index";
import Dropdown from "./common/Dropdown";

type NavLinkProps = {
  text: string;
  bg: string;
  color: string;
  href?: string;
  [x: string]: any;
};

export default function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const { colorMode, toggleColorMode } = useColorMode();

  const fetchUser = async () => {
    const response = await getUser();
    if (response.status === 200) {
      setUser(response.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const bg = useColorModeValue("gray.100", "gray.600");
  const color = useColorModeValue("#333", "white");
  const popUpText = useColorModeValue("gray.500", "white");

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
          <BiSearchAlt color={color} size={20} />
        </InputLeftElement>
        <Input
          type="text"
          bg={useColorModeValue("white", "gray.700")}
          placeholder="Search"
        />
      </InputGroup>
      <HStack spacing="25px" alignSelf="center">
        {!user && (
          <>
            <NavLink
              text="Log In"
              bg={useColorModeValue("#fff", "#222223")}
              color={useColorModeValue("#1384D7", "white")}
              borderWidth="1px"
              borderColor={useColorModeValue("#1384D7", "white")}
              onClick={() => setShowLoginModal(!showLoginModal)}
            />
            <NavLink
              text="Sign Up"
              bg={useColorModeValue("#1384D7", "#C8CBCD")}
              color={useColorModeValue("white", "#222223")}
              onClick={() => setShowRegisterModal(!showRegisterModal)}
            />
          </>
        )}
        <Dropdown
          icon={<AiFillCaretDown size={15} color={color} />}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        >
          <>
            <Box
              w="12%"
              h="max-content"
              position="absolute"
              right="40px"
              top="45px"
              borderWidth="1px"
              borderColor="gray.200"
              bg={bg}
            >
              <Text
                fontSize="11px"
                fontWeight="bold"
                color={popUpText}
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
                <FaMoon color={color} />
                <Text fontSize={14}>Dark Mode</Text>
                <Switch
                  onChange={toggleColorMode}
                  isChecked={colorMode === "dark" ? true : false}
                />
              </Flex>
              <Text
                fontSize="11px"
                fontWeight="bold"
                color={popUpText}
                letterSpacing="0.6px"
                textTransform="uppercase"
                px="15px"
                py="10px"
              >
                More Options
              </Text>
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
                <RiLoginBoxFill color={color} />
                <Text fontSize={14} ml="13px">
                  Log In / Sign Up
                </Text>
              </Flex>
            </Box>
          </>
        </Dropdown>
      </HStack>
      <LoginModal showModal={showLoginModal} setShowModal={setShowLoginModal} />
      <RegisterModal
        showModal={showRegisterModal}
        setShowModal={setShowRegisterModal}
      />
    </Flex>
  );
}

const NavLink: React.FC<NavLinkProps> = ({
  text,
  bg,
  color,
  onClick,
  ...otherProps
}) => {
  return (
    <Button
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
      onClick={onClick}
      {...otherProps}
    >
      {text}
    </Button>
  );
};
