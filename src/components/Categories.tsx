import { Button } from "@chakra-ui/button";
import { Box, Divider, Text } from "@chakra-ui/layout";
//@ts-ignore
import { CategoryType } from "@types/";
import React, { useState } from "react";
import StyledBox from "./common/StyledBox";
import { useHistory } from "react-router-dom";

export default function Categories({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [selected, setSelected] = useState<string>("");
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <StyledBox maxW="15vw" fontWeight="medium" p={0} fontFamily="mono">
      <Box bg="gray.100" py={2} px={4}>
        <Text fontSize={17}>Categories</Text>
      </Box>
      <Divider />
      <CategoryButton
        category={{ name: "All Categories" }}
        selected={selected}
        setSelected={setSelected}
      />
      {categories &&
        categories.map((category: CategoryType, i: number) => (
          <React.Fragment key={category.name}>
            {!expanded ? (
              i <= 7 && (
                <CategoryButton
                  category={category}
                  selected={selected}
                  setSelected={setSelected}
                />
              )
            ) : (
              <CategoryButton
                category={category}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </React.Fragment>
        ))}
      <Button
        w="100%"
        borderRadius={50}
        height={0}
        py="15px"
        fontSize={15}
        color="#4C6CD8"
        bg="none"
        _focus={{}}
        _active={{}}
        transition="0s"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Show More"}
      </Button>
    </StyledBox>
  );
}

const CategoryButton = ({
  category,
  selected,
  setSelected,
}: {
  category: CategoryType;
  selected: string;
  setSelected: Function;
}) => {
  const history = useHistory();

  return (
    <>
      <Divider />
      <Button
        textAlign="left"
        fontSize={12}
        fontWeight="bold"
        justifyContent="flex-start"
        borderRadius={0}
        _focus={{}}
        _active={{}}
        w="100%"
        boxShadow={
          selected === category.name ? "inset 5px 0px 0px #4C6CD8 " : ""
        }
        bg={selected === category.name ? "gray.100" : "transparent"}
        onClick={() => {
          setSelected(category.name);
          history.push(
            `/subreddits/trending/${category.name
              .split(" ")
              .join("_")
              .split("&")
              .join("and")
              .toLowerCase()}`
          );
        }}
      >
        {category.name}
      </Button>
    </>
  );
};
