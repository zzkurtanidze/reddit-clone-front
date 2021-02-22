//@ts-nocheck
import { Box, Button, Flex, Text, Input, Link } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import PostTab from "./tabs/PostTab";
import ImagesTab from "./tabs/ImagesTab";
import { UserContext } from "../../context/UserContext";

import { RiImageFill, RiMessage2Fill } from "react-icons/ri";
import { IoIosLink } from "react-icons/io";
import { newPost } from "../../api";
import TabButton from "../common/TabButton";

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
  const [draftPosts, setDraftPosts] = useState<number>(0);

  useEffect(() => {
    const communityNames: any[] = [];

    const drafts = JSON.parse(window.localStorage.getItem("postDrafts")) || [];
    setDraftPosts(drafts.length);

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
    newPost["postedTo"] = community;
    setPost(newPost);
  };

  const submitPost = async () => {
    const response = await newPost(post);
    if (response.statusText === "OK") {
      window.location.replace("/");
    }
  };

  const isNull = (object: object) => {
    for (var key in post) {
      if (object[key] !== null && object[key] !== "") {
        return false;
      }
      return true;
    }
  };

  const handleSaveDraft = () => {
    if (!isNull(post)) {
      let prevDrafts =
        JSON.parse(window.localStorage.getItem("postDrafts")) || [];
      let draft = post;
      draft["date"] = Date.now();
      prevDrafts.push(draft);
      window.localStorage.setItem("postDrafts", JSON.stringify(prevDrafts));
    }
  };

  return (
    <>
      <Flex justifyContent="space-between">
        <Text fontWeight="600" fontSize={20}>
          Create a Post
        </Text>
        <Link
          href={`/submit/drafts`}
          bg="none"
          display="flex"
          alignItems="center"
          fontWeight="bold"
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
            {draftPosts}
          </Text>
        </Link>
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
              onClick={() => handleSaveDraft()}
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
