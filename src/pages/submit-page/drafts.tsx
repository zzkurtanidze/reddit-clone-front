//@ts-nocheck
import React, { useEffect, useState } from "react";
import { getDraftPosts } from "../../api";
import Container from "../../components/common/Container";
import DraftsList from "../../components/posts/post-form/drafts/DraftsList";
import { NotPostedPostType } from "../../types";

export default function PostDraftsPage() {
  const [drafts, setDrafts] = useState<NotPostedPostType>();
  const handleRemove = (draft) => {
    let posts = JSON.parse(localStorage.getItem("postDrafts")) || [];

    let index = posts.findIndex((post) => post.title === draft.title);
    posts.splice(index, 1);

    // localStorage.setItem("postDrafts", JSON.stringify(posts));
    setDrafts(posts);
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

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
