import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserFollowing } from "../../../api";
import { UserType } from "../../../types";
import ModalLoading from "../../common/ModalLoading";
import Modal from "../../Modal";
import UserPicture from "../common/UserPicture";

import { Link } from "react-router-dom";

export default function Following({
  showModal,
  setShowModal,
  id,
}: {
  showModal: boolean;
  setShowModal: Function;
  id: string;
}) {
  const [following, setFollowing] = useState<[UserType] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = async () => {
    setLoading(true);
    const response = await getUserFollowing(id);
    if (response.statusText === "OK") {
      setFollowing(response.data);
    }
    setLoading(false);
  };

  if (loading) return <ModalLoading />;
  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Text fontSize={28} fontWeight="bold">
        Following
      </Text>
      <Flex mt={10} w="100%" flexDirection="column">
        {following.length === 0 ? (
          <Text textAlign="center">No Following Users</Text>
        ) : (
          following.map((user) => (
            <Flex
              p={4}
              _hover={{ backgroundColor: "#d6eaff" }}
              transition=".5s all ease"
              w="100%"
              h="max-content"
              alignItems="center"
              gridGap={5}
            >
              <Link to={`/user/${user.username}`}>
                <Text
                  display="flex"
                  alignItems="center"
                  gridGap={5}
                  _focus={{}}
                >
                  <UserPicture image={user.image} width="40px" />
                  {user.username}
                </Text>
              </Link>
            </Flex>
          ))
        )}
      </Flex>
    </Modal>
  );
}
