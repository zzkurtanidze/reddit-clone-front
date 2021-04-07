//@ts-nocheck
import {
  Box,
  Button,
  Flex,
  Text,
  Input,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import PostTab from "./tabs/PostTab";
import ImagesTab from "./tabs/ImagesTab";
import { UserContext } from "../../../context/UserContext";

import queryString from "query-string";

import { RiImageFill, RiMessage2Fill } from "react-icons/ri";
import { IoIosLink } from "react-icons/io";
import {
  getCategories,
  getCommunity,
  getDraftPosts,
  newPost,
  removeDraftPost,
  saveDraftPost,
} from "../../../api";
import TabButton from "../../common/TabButton";
import StyledBox from "../../common/StyledBox";
import LinkTab from "./tabs/LinkTab";
import { CategoryButton } from "./common/CategoryButton";
import { CategoryDropdown } from "./common/CategoryDropdown";

import { Link } from "react-router-dom";

export default function NewPostForm({ match }: { match?: any }) {
  const user = useContext(UserContext);
  const [communityList, setCommunityList] = useState<any>([]);
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState<{
    title: string;
    body: string | undefined;
    image?: string;
    url?: string;
    hideVotes: boolean;
    postedTo: string;
    category: Array;
  }>({ title: "", postedTo: "", hideVotes: false, category: [] });
  const [selectedTab, setSelectedTab] = useState<string>("post");
  const [draftsLength, setDraftsLength] = useState<number>(0);
  const [drafts, setDrafts] = useState();
  const [disabled, setDisabled] = useState<boolean>(true);

  const params = queryString.parse(window.location.search);

  const toast = useToast();

  const fetchCommunity = async () => {
    const response = await getCommunity(match.params.name);
    if (response.statusText === "OK") {
      const data = response.data;
      const community = { label: data.name, value: data._id };
      if (!post.postedTo) {
        setCommunityList([community]);
        setPost({ ...post, postedTo: community });
      }
    } else {
      return undefined;
    }
  };

  const fetchCategories = async () => {
    const response = await getCategories();
    if (response.statusText === "OK") {
      setCategories(response.data);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (match && match.params.name) {
      fetchCommunity();
    } else {
      fetchDrafts();

      const communityNames: any[] = [];

      // Set draft numbers
      setDraftsLength(user ? user.drafts.length : 0);

      // If draft available, set values.
      if (params.draft && isNull(post) && drafts) {
        let index = drafts.findIndex((post) => post._id == params.draft);
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
    }
  }, [user, post, drafts]);

  useEffect(() => {
    document.getElementById("draft-save").disabled = false;

    if (post.title && post.postedTo) {
      setDisabled(false);
    }
  }, [post]);

  const fetchDrafts = async () => {
    const response = await getDraftPosts();
    if (response && response.statusText === "OK") {
      setDrafts(response.data);
    }
  };

  const handleBodyChange = (html: any) => {
    const newPost = post;
    newPost["body"] = html;
    setPost(newPost);
  };

  const removeCurrentDraft = async () => {
    await removeDraftPost(params.draft);
  };

  const submitPost = async () => {
    if (params.draft) {
      removeCurrentDraft();
    }
    const response = await newPost(post);
    if (response.statusText === "OK") {
      window.location.replace("/");
    } else {
      toast({
        status: "error",
        title: response.data,
      });
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

  const handleSaveDraft = async () => {
    if (params.draft) {
      removeCurrentDraft();
    }
    if (!isNull(post)) {
      let draft = post;
      draft["date"] = Date.now();
      const response = await saveDraftPost(draft);
      if (response.statusText === "OK") {
        toast({
          title: "Saved succesfully",
          status: "success",
        });
      }
    }
    document.getElementById("draft-save").disabled = true;
  };

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text fontWeight="600" fontSize={20} fontFamily="mono">
          Create a Post
        </Text>
        <Link to={`/submit/drafts`}>
          <Text
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
          </Text>
        </Link>
      </Flex>
      <br />
      <hr />
      <Box w="30%" my={5}>
        {user && (
          <Select
            value={post.postedTo}
            onChange={async (community: any) => {
              setPost({
                ...post,
                postedTo: community,
              });
            }}
            options={communityList}
          />
        )}
      </Box>
      <StyledBox p={0} fontFamily="mono" overflow="show">
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
            onChange={(e) =>
              setPost({
                ...post,
                title: e.target.value,
              })
            }
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
              onChange={(imageURL) =>
                setPost({
                  ...post,
                  image: imageURL,
                })
              }
            />
          )}
          {selectedTab === "link" && (
            <LinkTab
              value={post.url}
              onChange={(e) =>
                setPost({
                  ...post,
                  url: e.target.value,
                })
              }
            />
          )}
          <Checkbox
            size="sm"
            fontFamily="mono"
            fontWeight="bold"
            alignSelf="flex-end"
            onChange={(e) =>
              setPost({
                ...post,
                hideVotes: e.target.checked,
              })
            }
          >
            Hide votes
          </Checkbox>
          <Flex justifyContent="space-between">
            <Flex mt={5} alignSelf="flex-start">
              {categories && (
                <>
                  {categories.map((category, index) =>
                    index <= 1 ? (
                      <CategoryButton
                        label={category.name}
                        key={index}
                        post={post}
                        setPost={setPost}
                      />
                    ) : (
                      <></>
                    )
                  )}
                  <CategoryDropdown
                    label="More"
                    items={categories.slice(2, categories.length - 1)}
                    post={post}
                    setPost={setPost}
                  />
                </>
              )}
            </Flex>
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
        </Flex>
      </StyledBox>
    </Box>
  );
}
