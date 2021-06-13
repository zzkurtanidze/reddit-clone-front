//@ts-nocheck
import { Button, Table, Td, Text, Th, Tr } from "@chakra-ui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { NotPostedPostType } from "../../../../types";
import { useHistory } from "react-router-dom";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

export default function DraftsList({ drafts, handleRemove }): {
  drafts: NotPostedPostType[];
  handleRemove: Function;
} {
  const timeAgo = new TimeAgo("en-US");
  const history = useHistory();

  return drafts.length >= 1 ? (
    <Table bg="white" borderRadius={5}>
      <Tr>
        <Th>Post Title</Th>
        <Th>Posted to</Th>
        <Th>Date</Th>
        <Th></Th>
        <Th></Th>
      </Tr>
      {drafts.reverse().map((draft) => (
        <Tr>
          {draft.title ? <Td>{draft.title}</Td> : <Td>null</Td>}
          {draft.postedTo ? <Td>{draft.postedTo.label}</Td> : <Td>null</Td>}
          {draft.date ? (
            <Td>{timeAgo.format(parseInt(draft.date))}</Td>
          ) : (
            <Td>null</Td>
          )}
          <Td textAlign="right">
            <Button
              onClick={() => history.push(`/submit/?draft=${draft._id}`)}
              bg="#0272C5"
              _active={{}}
              _hover={{}}
            >
              <FaEdit color="white" />
            </Button>
          </Td>
          <Td textAlign="right">
            <Button
              bg="#c40303"
              _active={{}}
              _hover={{}}
              onClick={() => handleRemove(draft)}
            >
              <RiDeleteBinLine color="white" />
            </Button>
          </Td>
        </Tr>
      ))}
    </Table>
  ) : (
    <Text textAlign="center" fontWeight="bold" fontSize={30}>
      No drafts yet
    </Text>
  );
}
