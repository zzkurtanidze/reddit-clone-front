//@ts-ignore
import { getCategories } from "@api/";
import Categories from "@components/Categories";
import Container from "@components/common/Container";
import React from "react";

export default function SubredditsPage() {
  const { categories } = getCategories();

  return (
    <Container>
      <Categories categories={categories} />
    </Container>
  );
}
