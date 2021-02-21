import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { joinCommunity } from "../../api";
import { CommunityType, UserType } from "../../types";
import LoginModal from "../form-modals/LoginModal";

export default function Join({
  user,
  community,
}: {
  user: UserType | undefined;
  community: CommunityType;
}) {
  const [joined, setJoined] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);

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
    } else if (!user) {
      setLoginModal(true);
    }
  };

  return (
    <>
      <Button
        px={50}
        py="8px"
        h="max-content"
        fontSize={14}
        borderRadius={50}
        bg={joined ? "#e2e2e2" : "#1384D7"}
        color={joined ? "black" : "white"}
        _hover={{
          backgroundColor: joined ? "#c9c9c9" : "#3c9ce0",
        }}
        onClick={handleJoin}
      >
        {joined ? "Leave" : "Join"}
      </Button>
      <LoginModal showModal={loginModal} setShowModal={setLoginModal} />
    </>
  );
}
