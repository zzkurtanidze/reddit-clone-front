/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { PostType, UserType } from "../../types";
import LoginModal from "../auth-modals/LoginModal";

import { io } from "socket.io-client";
import VotesLoading from "@components/common/loading-animations/VotesLoading";

const socket = io("http://localhost:4000", { transports: ["websocket"] });

export default function Votes({
  user,
  post,
}: {
  user?: UserType | undefined;
  post?: PostType;
}) {
  const [status, setStatus] = useState<string>("");
  const [likes, setLikes] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (post) {
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
    }
  }, [user, post]);

  useEffect(() => {
    if (post) {
      socket.on("post-vote", ({ status, counter, postId, userId }) => {
        if (postId === post._id && userId === user?._id) {
          setDisabled(false);
          setStatus(status);
          setLikes((likes) => (likes += counter));
        }
      });
    }
  }, []);

  const handleLike = async (e: any) => {
    if (!user) setShowModal(true);
    else if (post) {
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
        setDisabled(true);
      }
    }
  };

  if (!post) return <VotesLoading />;
  return (
    <Flex
      direction="column"
      alignItems="center"
      position="relative"
      gridGap="5px"
      overflow="hidden"
      w="30px"
      p={0}
    >
      <Button
        px={0}
        py={2}
        h="max-content"
        bg={status === "like" ? "gray.200" : "transparent"}
        _focus={{ boxShadow: 0 }}
        name="like"
        onClick={handleLike}
        disabled={disabled}
      >
        <ImArrowUp
          name="like"
          size={13}
          color={status === "like" ? `#ff3838` : "gray"}
        />
      </Button>
      <Text w="max-content" textAlign="center" fontWeight="bold" fontSize={10}>
        {post?.hideVotes ? "Votes" : likes}
      </Text>
      <Button
        px={0}
        py={2}
        w="max-content"
        h="max-content"
        borderRadius={5}
        bg={status === "unlike" ? "gray.200" : "transparent"}
        _focus={{ boxShadow: 0 }}
        name="unlike"
        onClick={handleLike}
        disabled={disabled}
      >
        <ImArrowDown
          size={13}
          color={status === "unlike" ? `#5b6be5` : "gray"}
        />
      </Button>
      {showModal && (
        <LoginModal setShowModal={setShowModal} showModal={showModal} />
      )}
    </Flex>
  );
}
