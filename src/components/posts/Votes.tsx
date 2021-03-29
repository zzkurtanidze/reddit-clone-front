import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { PostType, UserType } from "../../types";
import LoginModal from "../auth-modals/LoginModal";

import { io } from "socket.io-client";

const socket = io("http://localhost:4000", { transports: ["websocket"] });

export default function Votes({
  user,
  post,
}: {
  user: UserType | undefined;
  post: PostType;
}) {
  const [status, setStatus] = useState<string>("");
  const [likes, setLikes] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setLikes(post.votes);
    const likedPostIds: [string | undefined] = [""];
    const dislikedPostIds: [string | undefined] = [""];
    user?.dislikedPosts?.forEach((post) => {
      dislikedPostIds.push(post._id);
    });
    user?.likedPosts?.forEach((post) => {
      likedPostIds.push(post._id);
    });
    if (likedPostIds.includes(post._id)) {
      setStatus("like");
    }
    if (dislikedPostIds.includes(post._id)) {
      setStatus("unlike");
    }
  }, [user]);

  useEffect(() => {
    socket.on("post-vote", ({ status, counter }) => {
      setStatus(status);
      setLikes((likes) => (likes += counter));
    });
  }, []);

  const handleLike = async (e: any) => {
    if (!user) setShowModal(true);
    else {
      let action =
        e.target.parentNode.name ||
        e.target.parentElement.parentNode.name ||
        e.target.name;
      if (action) {
        socket.emit("post-vote", {
          action,
          status,
          userId: user._id,
          postId: post._id,
        });
      }
    }
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      my="15px"
      mr="15px"
      gridGap="5px"
    >
      <Button
        p={0}
        m={0}
        borderRadius={5}
        bg={status === "like" ? "gray.200" : "transparent"}
        _focus={{ boxShadow: 0 }}
        name="like"
        onClick={handleLike}
      >
        <ImArrowUp name="like" color={status === "like" ? `#ff3838` : "gray"} />
      </Button>
      <Text textAlign="center" fontWeight="bold" fontSize={12}>
        {likes}
      </Text>
      <Button
        p={0}
        m={0}
        borderRadius={5}
        bg={status === "unlike" ? "gray.200" : "transparent"}
        _focus={{ boxShadow: 0 }}
        name="unlike"
        onClick={handleLike}
      >
        <ImArrowDown color={status === "unlike" ? `#5b6be5` : "gray"} />
      </Button>
      {showModal && (
        <LoginModal setShowModal={setShowModal} showModal={showModal} />
      )}
    </Flex>
  );
}
