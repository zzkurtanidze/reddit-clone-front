//@ts-nocheck
import { useToast } from "@chakra-ui/toast";
import React, { useEffect, useState } from "react";
import { getDraftPosts, removeDraftPost } from "@api";
import Container from "@components/common/Container";
import DraftsList from "@components/posts/post-form/drafts/DraftsList";
import { NotPostedPostType } from "@types";

export default function PostDraftsPage() {
  const [drafts, setDrafts] = useState<NotPostedPostType>();

  const toast = useToast();

  useEffect(() => {
    fetchDrafts();
  }, []);

  const handleRemove = async (draft) => {
    const response = await removeDraftPost(draft._id);
    console.log(response);
    if (response.statusText === "OK") {
      toast({
        title: response.data,
        status: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast({
        title: response.data,
        status: "error",
      });
    }
  };

  const fetchDrafts = async () => {
    const response = await getDraftPosts();
    if (response.statusText === "OK") {
      setDrafts(response.data);
    }
  };

  return (
    <Container>
      {drafts && <DraftsList drafts={drafts} handleRemove={handleRemove} />}
    </Container>
  );
}
