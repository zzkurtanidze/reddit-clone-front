//@ts-nocheck
import { Box, Button, Flex, Text, Input, Link } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import PostTab from "./tabs/PostTab";
import ImagesTab from "./tabs/ImagesTab";
import { UserContext } from "../../../context/UserContext";

import queryString from "query-string";

import { RiImageFill, RiMessage2Fill } from "react-icons/ri";
import { IoIosLink } from "react-icons/io";
import { newPost } from "../../../api";
import TabButton from "../../common/TabButton";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import StyledBox from "../../common/StyledBox";
import LinkTab from "./tabs/LinkTab";

export default function NewPostForm() {
  const user = useContext(UserContext);
  const [communityList, setCommunityList] = useState<any>([]);
  const [post, setPost] = useState<{
    title: string;
    body: string;
    image?: string;
    url?: string;
    postedTo: string;
  }>({ title: "", body: "", image: "", postedTo: "", url: "" });
  const [selectedTab, setSelectedTab] = useState<string>("post");
  const [draftsLength, setDraftsLength] = useState<number>(0);
  const [drafts, setDrafts] = useLocalStorage("postDrafts");
  const [disabled, setDisabled] = useState<boolean>(true);

  const params = queryString.parse(window.location.search);

  useEffect(() => {
    const communityNames: any[] = [];

    // Set draft numbers
    setDraftsLength(drafts ? drafts.length : 0);

    // If draft available, set values.
    if (params.draft && isNull(post)) {
      let index = drafts.findIndex((post) => post.date == params.draft);
      setPost(drafts[index]);
    }

    // Get joined communities list.
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
  }, [user, post]);

  useEffect(() => {
    document.getElementById("draft-save").disabled = false;

    if (post.body && post.title && post.postedTo) {
      setDisabled(false);
    }
  }, [post]);

  const handleBodyChange = (html: any) => {
    const newPost = post;
    newPost["body"] = html;
    setPost(newPost);
  };

  const removeCurrentDraft = () => {
    let newDrafts = drafts;
    let index = newDrafts.findIndex((item) => item.date === params.draft);
    newDrafts.splice(index, 1);
    setDrafts(newDrafts);
  };

  const submitPost = async () => {
    if (params.draft) {
      removeCurrentDraft();
    }
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
    if (params.draft) {
      removeCurrentDraft();
    }
    if (!isNull(post)) {
      let prevDrafts =
        JSON.parse(window.localStorage.getItem("postDrafts")) || [];
      let draft = post;
      draft["date"] = Date.now();
      prevDrafts.push(draft);
      window.localStorage.setItem("postDrafts", JSON.stringify(prevDrafts));
    }
    document.getElementById("draft-save").disabled = true;
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
            {draftsLength}
          </Text>
        </Link>
      </Flex>
      <br />
      <hr />
      <Box w="30%" my={5}>
        {user && (
          <Select
            value={post.postedTo}
            onChange={(community: any) =>
              setPost({ ...post, ["postedTo"]: community })
            }
            options={communityList}
          />
        )}
      </Box>
      <StyledBox p={0} fontFamily="mono">
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
          <Input
            value={post.title}
            onChange={(e) => setPost({ ...post, ["title"]: e.target.value })}
            bg="white"
            placeholder="Title"
          />
          {selectedTab === "post" && (
            <PostTab onChange={handleBodyChange} post={post} />
          )}
          {selectedTab === "images" && (
            <ImagesTab
              post={post}
              value={post.image}
              onChange={(imageURL) => setPost({ ...post, ["image"]: imageURL })}
            />
          )}
          {selectedTab === "link" && (
            <LinkTab
              value={post.url}
              onChange={(e) => setPost({ ...post, ["url"]: e.target.value })}
            />
          )}
          <Flex mt={5} alignSelf="flex-end">
            <Button
              bg="none"
              color="#0079D3"
              _hover={{}}
              _active={{}}
              _focus={{}}
              onClick={() => handleSaveDraft()}
              id="draft-save"
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
              disabled={disabled}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </StyledBox>
    </>
  );
}
