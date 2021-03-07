import { Flex, Image, Link, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserFollowers } from "../../../api";
import { UserType } from "../../../types";
import ModalLoading from "../../common/ModalLoading";
import Modal from "../../Modal";
import UserPicture from "../UserPicture";

export default function Followers({
  showModal,
  setShowModal,
  id,
}: {
  showModal: boolean;
  setShowModal: Function;
  id: string;
}) {
  const [followers, setFollowers] = useState<[UserType] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = async () => {
    setLoading(true);
    const response = await getUserFollowers(id);
    if (response.statusText === "OK") {
      setFollowers(response.data);
    }
    setLoading(false);
  };

  if (loading) return <ModalLoading />;
  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Text fontSize={28} fontWeight="bold">
        Followers
      </Text>
      <Flex mt={10} w="100%" flexDirection="column">
        {followers.length === 0 ? (
          <Text textAlign="center">No Followers</Text>
        ) : (
          followers.map((user) => (
            <Flex
              p={4}
              _hover={{ backgroundColor: "#d6eaff" }}
              transition=".5s all ease"
              w="100%"
              h="max-content"
              alignItems="center"
              gridGap={5}
            >
              <Link
                display="flex"
                alignItems="center"
                gridGap={5}
                _focus={{}}
                href={`/user/${user.username}`}
              >
                <UserPicture image={user.image} width="40px" />
                {user.username}
              </Link>
            </Flex>
          ))
        )}
      </Flex>
    </Modal>
  );
}
