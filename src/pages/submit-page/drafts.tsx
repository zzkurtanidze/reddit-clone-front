//@ts-nocheck
import React, { useEffect, useState } from "react";
import Container from "../../components/common/Container";
import DraftsList from "../../components/post-form/drafts/DraftsList";
import { NotPostedPostType } from "../../types";

export default function PostDraftsPage() {
  const [drafts, setDrafts] = useState<NotPostedPostType[] | undefined>();

  const handleRemove = (draft) => {
    let posts = JSON.parse(localStorage.getItem("postDrafts")) || [];

    let index = posts.findIndex((post) => post.title === draft.title);
    posts.splice(index, 1);

    localStorage.setItem("postDrafts", JSON.stringify(posts));
    setDrafts(posts);
  };

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("postDrafts")!);
    if (posts) {
      setDrafts(posts);
    }
  }, []);

  return (
    <Container>
      {drafts && <DraftsList drafts={drafts} handleRemove={handleRemove} />}
    </Container>
  );
}
