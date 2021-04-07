import React, { useContext, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/layout";
import { joinCommunity } from "../../../api";
import { UserContext } from "../../../context/UserContext";
import { CommunityType } from "../../../types";
import PrimaryButton from "../../common/PrimaryButton";
import LoginModal from "../../auth-modals/LoginModal";

import { GoPlus } from "react-icons/go";
import { BiMinus } from "react-icons/bi";
import { useToast } from "@chakra-ui/toast";

export default function Join({
  community,
  icon = false,
  refresh = false,
  ...props
}: {
  community: CommunityType;
  icon?: boolean;
  refresh?: boolean;
  [x: string]: any;
}) {
  const [joined, setJoined] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const user = useContext(UserContext);

  const toast = useToast();

  useEffect(() => {
    if (user?.joined) {
      user.joined.forEach((joinedCommunity) => {
        if (joinedCommunity._id === community._id) {
          setJoined(true);
        }
      });
    }
  }, [user]);

  const handleJoin = async () => {
    const response = await joinCommunity(community._id);
    if (response && response.statusText === "OK") {
      setJoined(!joined);
      let message;
      if (!joined) {
        message = `Sucesfully joined r/${community.username}`;
      } else {
        message = `Sucesfully left r/${community.username}`;
      }
      toast({
        title: message,
        duration: 1000,
        variant: "left-accent",
        isClosable: true,
      });
    } else if (!user) {
      setLoginModal(true);
    }
    if (refresh) {
      window.location.reload();
    }
  };

  return (
    <Flex>
      <PrimaryButton
        label={joined ? "Leave" : "Join"}
        bg={joined ? "white" : "#0079D3"}
        color={joined ? "#0079D3" : "white"}
        onClick={handleJoin}
        icon={
          icon &&
          (joined ? <BiMinus color="black" /> : <GoPlus color="white" />)
        }
        w="130px"
        border={"1px solid #0079D3"}
        borderRadius={50}
        _focus={{}}
        {...props}
      />
      <LoginModal showModal={loginModal} setShowModal={setLoginModal} />
    </Flex>
  );
}
