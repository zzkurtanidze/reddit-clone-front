import { Button } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { joinCommunity } from "../../api";
import { UserContext } from "../../context/UserContext";
import { CommunityType, UserType } from "../../types";
import PrimaryButton from "../common/PrimaryButton";
import LoginModal from "../form-modals/LoginModal";

export default function Join({ community }: { community: CommunityType }) {
  const [joined, setJoined] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const user = useContext(UserContext);

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
      <PrimaryButton
        label={joined ? "Leave" : "Join"}
        bg={joined ? "#e2e2e2" : "#1384D7"}
        color={joined ? "black" : "white"}
        onClick={handleJoin}
      />
      <LoginModal showModal={loginModal} setShowModal={setLoginModal} />
    </>
  );
}
