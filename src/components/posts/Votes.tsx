import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { likePost } from "../../api";
import { PostType, UserType } from "../../types";
import LoginModal from "../form-modals/LoginModal";

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

  const handleLike = async (e: any) => {
    if (!user) setShowModal(true);
    else {
      let name =
        e.target.parentNode.name ||
        e.target.parentElement.parentNode.name ||
        e.target.name;
      if (name && post._id) {
        const { data } = await likePost({ action: name, id: post._id });
        const votes = data.votes;
        const status = data.status;
        setStatus(status);
        setLikes(votes);
      }
    }
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      my="15px"
      mr="15px"
      w="30px"
      gridGap="5px"
    >
      <Button
        p={0}
        m={0}
        borderRadius={5}
        bg="transparent"
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
        bg="transparent"
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
