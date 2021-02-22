import { Table, Td, Th, Tr } from "@chakra-ui/react";
import React from "react";

export default function DraftsList() {
  return (
    <Table>
      <Tr>
        <Th>Post Title</Th>
        <Th>Description</Th>
        <Th>Posted to</Th>
        <Th>Date</Th>
      </Tr>
      <Tr>
        <Td>Hello</Td>
        <Td>Hello</Td>
        <Td>Hello</Td>
        <Td>Hello</Td>
      </Tr>
    </Table>
  );
}
