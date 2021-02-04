import { Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import { UserType } from "../../../types";
import Modal from "../../Modal";

export default function Following({
  showModal,
  setShowModal,
  following,
}: {
  showModal: boolean;
  setShowModal: Function;
  following: [UserType] | [];
}) {
  console.log(following);

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Text fontSize={28} fontWeight="bold">
        Following
      </Text>
      <Flex mt={10} w="100%">
        {following.length === 0 ? (
          <Text textAlign="center">No Following Users</Text>
        ) : (
          following.map((user) => (
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
