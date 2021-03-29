import { Flex } from "@chakra-ui/react";
import React from "react";
import { SyncLoader } from "react-spinners";
import Modal from "../Modal";

export default function ModalLoading() {
  return (
    <Modal
      onClose={() => {
        return;
      }}
      open={true}
    >
      <Flex w="100%" h="150px" justifyContent="center" alignItems="center">
        <SyncLoader size={12} color="#FB4729" loading={true} />
      </Flex>
    </Modal>
  );
}
