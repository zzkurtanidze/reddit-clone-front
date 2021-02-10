import { Box, Button, Flex, Text, Input } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import PostTab from "./tabs/PostTab";
import ImagesTab from "./tabs/ImagesTab";
import { UserContext } from "../../context/UserContext";

import { RiImageFill, RiMessage2Fill } from "react-icons/ri";
import { IoIosLink } from "react-icons/io";
import { newPost } from "../../api";

export default function NewPostForm() {
  const user = useContext(UserContext);
  const [communityList, setCommunityList] = useState<any>([]);
  const [post, setPost] = useState<{
    title: string;
    body: string;
    image: string;
    postedTo: string;
  }>({ title: "", body: "", image: "", postedTo: "" });
  const [selectedTab, setSelectedTab] = useState<string>("post");

  useEffect(() => {
    const communityNames: any[] = [];

    user?.joined?.forEach((community) => {
      const obj: { value: string; label: string } = {
        value: "",
        label: "",
      };
      obj["label"] = community.name;
      obj["value"] = community._id;
      communityNames.push(obj);
    });

    setCommunityList(communityNames);
  }, [user]);

  const handleTitleChange = (e: any) => {
    const newPost = post;
    newPost["title"] = e.target.value;
    console.log(post);
    setPost(newPost);
  };

  const handleBodyChange = (html: any) => {
    const newPost = post;
    newPost["body"] = html;
    setPost(newPost);
  };

  const handleImageChange = (imageURL: string) => {
    const newPost = post;
    newPost["image"] = imageURL;
    setPost(newPost);
  };

  const handleCommunityChange = (community: any) => {
    const newPost = post;
    newPost["postedTo"] = community.value;
    setPost(newPost);
  };

  const submitPost = async () => {
    const response = await newPost(post);
    console.log(response);
  };

  return (
    <>
      <Flex justifyContent="space-between">
        <Text fontWeight="600" fontSize={20}>
          Create a Post
        </Text>
        <Button
          bg="none"
          _hover={{}}
          _active={{}}
          _focus={{}}
          color="#0272C5"
          fontSize={12}
        >
          DRAFTS
          <Text
            bg="gray.600"
            color="white"
            borderRadius={3}
            ml="5px"
            p="2px"
            fontSize={14}
          >
            0
          </Text>
        </Button>
      </Flex>
      <br />
      <hr />
      <Box w="30%" my={5}>
        {user && (
          <Select onChange={handleCommunityChange} options={communityList} />
        )}
      </Box>
      <Box borderRadius={7} pb="10px" bg="gray.100">
        <Flex w="100%">
          <TabButton
            selected={selectedTab === "post"}
            label="Post"
            icon={<RiMessage2Fill size={20} />}
            onClick={() => setSelectedTab("post")}
          />
          <TabButton
            selected={selectedTab === "images"}
            label="Images & Video"
            icon={<RiImageFill size={20} />}
            onClick={() => setSelectedTab("images")}
          />
          <TabButton
            selected={selectedTab === "link"}
            label="Link"
            icon={<IoIosLink size={20} />}
            onClick={() => setSelectedTab("link")}
          />
        </Flex>
        <Flex direction="column" m={5}>
          <Input onChange={handleTitleChange} bg="white" placeholder="Title" />
          {selectedTab === "post" && (
            <PostTab onChange={handleBodyChange} post={post} />
          )}
          {selectedTab === "images" && (
            <ImagesTab post={post} onChange={handleImageChange} />
          )}
          <Flex mt={5} alignSelf="flex-end">
            <Button
              bg="none"
              color="#0079D3"
              _hover={{}}
              _active={{}}
              _focus={{}}
            >
              Save as draft
            </Button>
            <Button
              bg="#0079D3"
              _hover={{}}
              _active={{}}
              _focus={{}}
              color="white"
              onClick={submitPost}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

function TabButton({
  icon,
  label,
  selected = false,
  onClick,
}: {
  icon: any;
  label: string;
  selected?: boolean;
  onClick: Function;
}) {
  return (
    <Button
      fontFamily="mono"
      color={selected ? "#0079D3" : "gray.500"}
      fontSize={16}
      w="100%"
      h="60px"
      gridGap={2}
      borderRadius={0}
      background={selected ? "#F2F8FD" : "none"}
      _hover={{ background: "gray.200" }}
      _active={{}}
      _focus={{}}
      borderBottom={selected ? "2px solid #0079D3" : ""}
      onClick={() => onClick()}
    >
      {icon && icon}
      {label}
    </Button>
  );
}
