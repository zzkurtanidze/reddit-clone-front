import React, { useContext, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/layout";
import { joinCommunity, leaveCommunity } from "../../../api";
import { UserContext } from "../../../context/UserContext";
import { CommunityType } from "../../../types";
import PrimaryButton from "../../common/PrimaryButton";
import LoginModal from "../../auth-modals/LoginModal";
import { useHistory } from "react-router-dom";

import { GoPlus } from "react-icons/go";
import { BiMinus } from "react-icons/bi";
import { useToast } from "@chakra-ui/toast";
import SecondaryButton from "@components/common/SecondaryButton";

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

  const history = useHistory();
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
      let message = `Sucesfully joined r/${community.username}`;
      toast({
        title: message,
        duration: 2000,
        variant: "left-accent",
        isClosable: true,
      });
    } else if (!user) {
      setLoginModal(true);
    }
    if (refresh) {
      history.push(`/r/${community.username}`);
    }
  };

  const handleLeave = async () => {
    const response = await leaveCommunity(community._id);
    if (response && response.statusText === "OK") {
      setJoined(!joined);
      let message = `Succesfully leaved r/${community.username}`;
      toast({
        title: message,
        duration: 2000,
        variant: "left-accent",
        isClosable: true,
      });
    } else if (!user) {
      setLoginModal(true);
    }
    if (refresh) {
      history.push(`/r/${community.username}`);
    }
  };

  return (
    <Flex>
      {!joined ? (
        <PrimaryButton
          label="Join"
          bg="#0079D3"
          color="white"
          onClick={handleJoin}
          icon={
            icon &&
            (joined ? <BiMinus color="black" /> : <GoPlus color="white" />)
          }
          w="100px"
          border={"1px solid #0079D3"}
          borderRadius={50}
          _focus={{}}
          {...props}
        />
      ) : (
        <SecondaryButton
          label="Leave"
          w="100px"
          onClick={handleLeave}
          icon={
            icon &&
            (joined ? <BiMinus color="black" /> : <GoPlus color="white" />)
          }
          borderRadius={50}
          _focus={{}}
          {...props}
        />
      )}

      <LoginModal showModal={loginModal} setShowModal={setLoginModal} />
    </Flex>
  );
}
