import { Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import { UserType } from "../../../types";
import Modal from "../../Modal";

export default function Followers({
  showModal,
  setShowModal,
  followers,
}: {
  showModal: boolean;
  setShowModal: Function;
  followers: [UserType] | [];
}) {
  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Text fontSize={28} fontWeight="bold">
        Followers
      </Text>
      <Flex mt={10} w="100%">
        {followers.length === 0 ? (
          <Text textAlign="center">No Followers</Text>
        ) : (
          followers.map((user) => (
            <>
              {user.image && <Image src={user.image} alt="profile-image" />}
              <Link>{user.username}</Link>
            </>
          ))
        )}
      </Flex>
    </Modal>
  );
}
