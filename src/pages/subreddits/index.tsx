//@ts-ignore
import { getCategories } from "@api/";
import Categories from "@components/Categories";
import Container from "@components/common/Container";
import React from "react";

export default function SubredditsPage({ match }: { match: any }) {
  const categoryName = match.params.categoryName || undefined;
  const { categories } = getCategories();

  return (
    <Container>
      <Categories categories={categories} selectedCategory={categoryName} />
    </Container>
  );
}
