//@ts-ignore
import { getNotifications } from "@api/";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useEffect, useState, useRef } from "react";
//@ts-ignore
import TimeAgo from "javascript-time-ago";
//@ts-ignore
import en from "javascript-time-ago/locale/en";
import { Button } from "@chakra-ui/button";
import { BiBell } from "react-icons/bi";
import CommunityPicture from "./community/common/CommunityPicture";
//@ts-ignore
import { seenNotification } from "@api/";
import { Link } from "react-router-dom";
import useOutsideClick from "@utils/useOutsideClick";

TimeAgo.addLocale(en);

export default function Notifications() {
  const { notifications, unread } = getNotifications();
  const timeAgo = new TimeAgo("en-US");
  const [notificationsTab, setNotificationsTab] = useState(false);
  const [updatedNotifications, setUpdatedNotifications] = useState<[]>();
  const [updatedUnread, setUpdatedUnread] = useState<number>(0);

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (notificationsTab) {
      setNotificationsTab(false);
    }
  });

  useEffect(() => {
    if (notifications) {
      setUpdatedNotifications(notifications);
      setUpdatedUnread(unread);
    }
  }, [notifications, unread]);

  return (
    <>
      <Button
        bg="none"
        _hover={{}}
        _active={{}}
        _focus={{}}
        onClick={() => setNotificationsTab(!notificationsTab)}
      >
        <BiBell size={22} />
        {updatedUnread > 0 && (
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
              {updatedUnread && updatedUnread}
            </Text>
          </Box>
        )}
      </Button>
      {notificationsTab && (
        //@ts-ignore
        <Box position="absolute" top="2px" right="0" ref={ref}>
          <Box
            w="15px"
            h="15px"
            transform="rotate(45deg)"
            bg="white"
            position="absolute"
            top="35px"
            right="20px"
            boxShadow="0px 3px 8px rgba(0,0,0,.3)"
            borderWidth="1px"
            borderColor="gray.200"
          ></Box>
          <Box
            position="absolute"
            top="40px"
            right="-15px"
            minW="400px"
            minH="100px"
            maxH="600px"
            overflowY="scroll"
            bg="white"
            borderRadius={3}
            boxShadow="0px 5px 5px rgba(0,0,0,.3)"
            borderWidth="1px"
            borderColor="gray.200"
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
              {updatedNotifications && updatedNotifications?.length > 0 ? (
                updatedNotifications?.map((notification: any) => (
                  <>
                    <Link
                      to={notification.more?.url}
                      onClick={async (e: any) => {
                        const { unread, notifications } =
                          await seenNotification(notification._id);
                        setUpdatedNotifications(notifications);
                        setUpdatedUnread(unread);
                        setNotificationsTab(false);
                      }}
                    >
                      <Flex
                        direction="column"
                        p={2}
                        bg={notification.seen ? "white" : "#E5F1FB"}
                        cursor="pointer"
                        position="relative"
                      >
                        <Flex alignItems="center" my={2} gridGap={1}>
                          <CommunityPicture
                            imageSrc={notification.more?.community?.image}
                            width="35px"
                            communityUsername={
                              notification.more?.community?.username
                            }
                          />
                          <Text
                            fontSize={14}
                            fontFamily="mono"
                            maxW="190px"
                            lineHeight="15px"
                            textOverflow="ellipsis"
                            fontWeight="medium"
                            ml={2}
                          >
                            {notification.title}
                          </Text>
                          <Text fontSize={12} color="gray.500">
                            •
                          </Text>
                          <Text fontSize={12} color="gray.500">
                            {timeAgo.format(parseInt(notification.date))}
                          </Text>
                          {!notification.seen && (
                            <Button
                              bg="red"
                              zIndex={2}
                              _hover={{}}
                              _focus={{}}
                              _active={{}}
                              minW="0px"
                              p={0}
                              m={0}
                              onClick={async (e: any) => {
                                e.preventDefault();
                                const { unread, notifications } =
                                  await seenNotification(notification._id);
                                setUpdatedNotifications(notifications);
                                setUpdatedUnread(unread);
                              }}
                              w="8px"
                              h="8px"
                              borderRadius={50}
                              background="blue.500"
                              position="relative"
                              left="20px"
                            ></Button>
                          )}
                        </Flex>
                        <Text
                          fontSize={12}
                          w="50%"
                          noOfLines={2}
                          color="gray.600"
                          ml="45px"
                        >
                          {notification.description}
                        </Text>
                      </Flex>
                    </Link>
                    <Box w="100%" h="1px" bg="rgba(0,0,0,.1)"></Box>
                  </>
                ))
              ) : (
                <Flex
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  mt={3}
                >
                  <Text fontSize={14} fontFamily="mono" fontWeight="medium">
                    No notifications yet
                  </Text>
                </Flex>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
