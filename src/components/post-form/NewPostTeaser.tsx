//@ts-nocheck
import { Button, Input } from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { RiImageLine } from "react-icons/ri";
import { BiLinkAlt } from "react-icons/bi";
import StyledBox from "../common/StyledBox";
import UserPictureThumbnail from "../user/UserPictureThumbnail";

export default function NewPostTeaser() {
  const user = useContext(UserContext);

  return (
    <StyledBox mb={5} display="flex" gridGap={5} alignItems="center">
      <UserPictureThumbnail image={user?.image} />
      <Input
        type="text"
        bg="white"
        onFocus={() => window.location.replace("/submit")}
        placeholder="Create Post"
      />
      <Button onClick={() => window.location.replace("/submit")} p="5px">
        <RiImageLine size="40px" color="#0272C5" />
      </Button>
      <Button onClick={() => window.location.replace("/submit")} p="5px">
        <BiLinkAlt size="40px" color="#7E8183" />
      </Button>
    </StyledBox>
  );
}
