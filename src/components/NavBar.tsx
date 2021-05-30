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
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";

import Logo from "../assets/reddit-logo.png";
import LoginModal from "./auth-modals/LoginModal";
import RegisterModal from "./auth-modals/register/RegisterModal";
import Dropdown from "./common/Dropdown";
import {
  DropdownItem,
  DropdownTitle,
  CustomDropdownItem,
  DropdownLink,
} from "./common/DropdownItems";
import { getNotifications, logOut, updateActiveStatus } from "../api/index";
//@ts-ignore
import TimeAgo from "javascript-time-ago";
//@ts-ignore
import en from "javascript-time-ago/locale/en";

import { BiBell, BiSearchAlt } from "react-icons/bi";
import { GoGear } from "react-icons/go";
import { FaMoon, FaUserCircle } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import PrimaryButton from "./common/PrimaryButton";
import SecondaryButton from "./common/SecondaryButton";
import { AiOutlinePlus } from "react-icons/ai";

TimeAgo.addLocale(en);

export default function NavBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState<boolean | undefined>();
  const user = useContext(UserContext);
  const { notifications, unread } = getNotifications();
  const [notificationsTab, setNotificationsTab] = useState(false);
  const timeAgo = new TimeAgo("en-US");

  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("white", "gray.600");
  const color = useColorModeValue("#333", "white");

  useEffect(() => {
    if (user) {
      //@ts-ignore
      setActiveStatus(user.active);
    }
  }, [user]);

  return (
    <Flex
      w="100%"
      h="60px"
      bg={bg}
      px={10}
      py={2}
      justifyContent="space-between"
      position="fixed"
      top="0"
      zIndex={5}
      alignItems="center"
      boxShadow="0 1px 0px rgba(0,0,0,.15)"
    >
      <Link to="/">
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
        {!user ? (
          <>
            <PrimaryButton
              label="Log In"
              bg={useColorModeValue("#fff", "#222223")}
              color={useColorModeValue("#1384D7", "white")}
              borderWidth="1px"
              borderColor={useColorModeValue("#1384D7", "white")}
              _hover={{}}
              _active={{}}
              w="120px"
              onClick={() => setShowLoginModal(!showLoginModal)}
            />
            <SecondaryButton
              label="Sign Up"
              bg={useColorModeValue("#1384D7", "#C8CBCD")}
              color={useColorModeValue("white", "#222223")}
              _hover={{}}
              _active={{}}
              w="120px"
              onClick={() => setShowRegisterModal(!showRegisterModal)}
            />
          </>
        ) : (
          <>
            <Box position="relative">
              <Button
                bg="none"
                _hover={{}}
                _active={{}}
                _focus={{}}
                onClick={() => setNotificationsTab(!notificationsTab)}
              >
                <BiBell size={22} />
                <Box
                  w="17px"
                  h="17px"
                  borderRadius={50}
                  position="absolute"
                  top="4px"
                  right="12px"
                  bg="#FB4729"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    color="white"
                    fontFamily="mono"
                    fontSize={12}
                    fontWeight="medium"
                  >
                    {unread && unread}
                  </Text>
                </Box>
              </Button>
              {notificationsTab && (
                <Box
                  position="absolute"
                  top="40px"
                  right="-15px"
                  minW="400px"
                  minH="100px"
                  bg="white"
                  borderRadius={3}
                  boxShadow="0px 3px 5px rgba(0,0,0,.3)"
                >
                  <Text
                    fontSize={13}
                    fontFamily="mono"
                    textAlign="left"
                    fontWeight="bold"
                    p={3}
                  >
                    Notifications
                  </Text>
                  <Box>
                    {notifications &&
                      notifications.map((notification: any) => (
                        <Flex
                          direction="column"
                          p={3}
                          bg={notification.seen ? "white" : "#E5F1FB"}
                          cursor="pointer"
                        >
                          <Flex alignItems="center" mt={4} gridGap={1}>
                            <Image
                              src="http://localhost:4000/assets/avatar.png"
                              w="35px"
                              h="35px"
                              borderRadius={50}
                              mr={1}
                            />
                            <Text
                              fontSize={14}
                              fontFamily="mono"
                              maxW="190px"
                              noOfLines={1}
                              textOverflow="ellipsis"
                            >
                              {notification.title}
                            </Text>
                            <Text fontSize={12} color="gray.500">
                              •
                            </Text>
                            <Text fontSize={12} color="gray.500">
                              {timeAgo.format(parseInt(notification.date))}
                            </Text>
                          </Flex>
                          <Text fontSize={12} color="gray.600" ml="45px">
                            {notification.description}
                          </Text>
                        </Flex>
                      ))}
                  </Box>
                </Box>
              )}
            </Box>
            <Link to="/submit">
              <AiOutlinePlus size={18} />
            </Link>
          </>
        )}
        <Dropdown
          title={user && user.username}
          icon={
            !user ? (
              <FaUserCircle />
            ) : (
              <Box position="relative">
                <Image
                  src={user.image || "http://localhost:4000/assets/avatar.png"}
                  w={6}
                  borderRadius={4}
                />
                {activeStatus && (
                  <Box
                    w={3}
                    h={3}
                    position="absolute"
                    bg="#63E35D"
                    bottom="-2px"
                    right="-2px"
                    border="2px solid white"
                    borderRadius={5}
                  ></Box>
                )}
              </Box>
            )
          }
        >
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
            {user && (
              <>
                <DropdownTitle label="Online Status" />
                <CustomDropdownItem title={activeStatus ? "On" : "Off"}>
                  <Switch
                    onChange={async () => {
                      const { data, statusText } = await updateActiveStatus({
                        active: !activeStatus,
                      });
                      if (statusText === "OK") {
                        setActiveStatus(data);
                      }
                    }}
                    isChecked={activeStatus}
                  />
                </CustomDropdownItem>
                <DropdownTitle label={"My Stuff"} />
                <DropdownLink
                  title="Profile"
                  icon={<FaUserCircle color={color} />}
                  href={`/user/${user.username}`}
                />
                <DropdownLink
                  title="User Settings"
                  icon={<GoGear color={color} />}
                  href="/settings/account"
                />
              </>
            )}
            <DropdownTitle label={"View Options"} />
            <CustomDropdownItem
              title="Dark Mode"
              icon={<FaMoon color={color} />}
            >
              <Switch
                onChange={toggleColorMode}
                isChecked={colorMode === "dark" ? true : false}
              />
            </CustomDropdownItem>
            <DropdownTitle label="More Options" />
            {!user ? (
              <DropdownItem
                title="Log In / Sign Up"
                icon={<RiLoginBoxFill color={color} />}
                onClick={() => {
                  setShowLoginModal(!showLoginModal);
                }}
              />
            ) : (
              <DropdownItem
                title="Log Out"
                icon={<RiLoginBoxFill color={color} />}
                onClick={async () => {
                  await logOut();
                  await updateActiveStatus({ active: false });
                  window.location.reload();
                }}
              />
            )}
          </Box>
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
