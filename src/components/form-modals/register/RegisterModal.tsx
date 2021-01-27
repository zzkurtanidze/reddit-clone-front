import React, { useState } from "react";
import RegisterUsernameModal from "./RegisterUsernameModal";
import RegisterEmailModal from "./RegisterEmailModal";

export default function RegisterModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) {
  const [stage, setStage] = useState(1);
  const [user, setUser] = useState({ email: "", username: "", password: "" });

  return stage === 1 ? (
    <RegisterEmailModal
      showModal={showModal}
      setShowModal={setShowModal}
      setStage={setStage}
      user={user}
      setUser={setUser}
    />
  ) : (
    <RegisterUsernameModal
      showModal={showModal}
      setShowModal={setShowModal}
      setStage={setStage}
      user={user}
      setUser={setUser}
    />
  );
}
