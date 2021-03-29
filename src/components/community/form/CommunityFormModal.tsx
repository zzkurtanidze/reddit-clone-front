import React from "react";
import Modal from "../../Modal";
import NewCommunityForm from "../form/NewCommunityForm";

export default function CommunityFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: Function;
}) {
  return (
    <Modal open={open} onClose={onClose} width="550px">
      <NewCommunityForm />
    </Modal>
  );
}
