import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { Component, useContext, useEffect, useState } from "react";
import { PostType } from "../../types/index";

import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaCommentAlt, FaShare } from "react-icons/fa";
import { RiBookmarkFill } from "react-icons/ri";

import { likePost } from "../../api/index";
import { UserContext } from "../../context/UserContext";
import LoginModal from "../form-modals/LoginModal";

export default function PostTeaser({ post }: { post: PostType }) {
  const [status, setStatus] = useState("");
  const [likes, setLikes] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useContext(UserContext);

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

  const bg = useColorModeValue("gray.100", "gray.900");

  const handleLike = async (e: any) => {
    if (!user) setShowModal(true);
    else {
      let name = e.target.name || e.target.parentElement.parentNode.name;
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
      w="100%"
      h="max-content"
      bg={bg}
      borderRadius="4px"
      p="15px"
      borderWidth="1px"
      borderColor="gray.300"
      mb="20px"
    >
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
          <ImArrowUp
            name="like"
            color={status === "like" ? `#ff3838` : "gray"}
          />
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
      </Flex>
      <Box>
        <Flex fontSize={12}>
          <Link fontWeight="bold">{post.postedTo["name"]}</Link>{" "}
          <Text color="gray.500" ml="10px">
            Posted By{" "}
            <Link href={`/user/${post.postedBy._id}`}>
              {post.postedBy.username}
            </Link>
          </Text>
        </Flex>
        <Text fontWeight="semibold">{post.title}</Text>
        <Text
          fontSize={14}
          className="post"
          dangerouslySetInnerHTML={{ __html: post.body }}
        ></Text>
        {post.image && (
          <Image
            src={`http://${post.image}`}
            mt="10px"
            w="100%"
            maxHeight="500px"
            objectFit="cover"
          />
        )}
        <Flex mt="20px">
          <PostButton icon={<FaCommentAlt color="gray" />} label="Comment" />
          <PostButton icon={<FaShare color="gray" />} label="Share" />
          <PostButton icon={<RiBookmarkFill color="gray" />} label="Save" />
        </Flex>
      </Box>
      <LoginModal setShowModal={setShowModal} showModal={showModal} />
    </Flex>
  );
}

const PostButton: any = ({
  icon,
  label,
}: {
  icon: Component;
  label: string;
}) => {
  return (
    <Link
      mx="5px"
      px="5px"
      py="2px"
      borderRadius={3}
      _hover={{
        backgroundColor: "gray.300",
      }}
    >
      <Flex h="max-content" alignItems="center" fontSize={12} gridGap="5px">
        {icon && icon}
        <Text fontWeight="bold" color="#808080">
          {label}
        </Text>
      </Flex>
    </Link>
  );
};
