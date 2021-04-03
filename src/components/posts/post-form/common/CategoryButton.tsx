import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { FaPlus, FaCheck } from "react-icons/fa";

export const CategoryButton = ({
  label,
  checkedIcon = <FaPlus color="#878A8C" size={14} />,
  uncheckedIcon = <FaCheck color="white" size={14} />,
  post,
  setPost,
  ...props
}: {
  label: string;
  checkedIcon?: JSX.Element;
  uncheckedIcon?: JSX.Element;
  post?: any;
  setPost?: any;
  [x: string]: any;
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (post && post.category.includes(label)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  return (
    <Button
      borderRadius={50}
      mx={1}
      my={2}
      fontSize={13}
      fontWeight="bold"
      h="max-content"
      py={2}
      color={checked ? "white" : "#878A8C"}
      border="1px solid #878A8C"
      bg={checked ? "#0B0B0B" : "white"}
      display="flex"
      gridGap={2}
      _hover={{ background: checked ? "#0B0B0B" : "#FAFAFB" }}
      _focus={{}}
      _active={{
        background: checked ? "#0B0B0B" : "#FAFAFB",
      }}
      textTransform="uppercase"
      onClick={() => {
        setChecked(!checked);
        if (post.category.includes(label)) {
          const newPost = post;
          newPost["category"].splice(label, 1);
          setPost(newPost);
        } else {
          setPost({
            ...post,
            category: [...post.category, label],
          });
        }
      }}
      {...props}
    >
      {!checked ? checkedIcon : uncheckedIcon}
      {label}
    </Button>
  );
};
