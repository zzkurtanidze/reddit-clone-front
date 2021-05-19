import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/layout";
import PrimaryButton from "@components/common/PrimaryButton";
import Modal from "@components/Modal";
import React, { useState } from "react";
import { CgMinimize, CgNotes } from "react-icons/cg";
//@ts-ignore
import { CommunityType } from "@types/";
import RulesForm from "../forms/RulesForm";
import EditRulesForm from "../forms/EditRulesForm";
//@ts-ignore
import { getRules } from "@api/";
import { Button } from "@chakra-ui/button";
import { BsPencil } from "react-icons/bs";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import FieldLoading from "@components/common/loading-animations/FieldLoading";

export default function RulesTab({ community }: { community: CommunityType }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { rules, isLoading } = getRules(community);
  const [expanded, setExpanded] = useState<number[]>([]);
  const [editModal, setEditModal] = useState<number>(-1);

  return (
    <Box>
      {showModal && (
        <Modal
          open={showModal}
          w="400px"
          px={5}
          onClose={() => setShowModal(false)}
        >
          <Text fontSize={18} fontFamily="mono" fontWeight="medium">
            Add Rule
          </Text>
          <Divider my={4} />
          <RulesForm community={community} setShowModal={setShowModal} />
        </Modal>
      )}
      <Flex
        justifyContent="flex-end"
        w="100%"
        h="max-content"
        mt="60px"
        p={2}
        bg="#EDEFF1"
      >
        <PrimaryButton
          label="Add Rule"
          onClick={() => setShowModal(true)}
          borderRadius={50}
          px={4}
        />
      </Flex>
      <Box mx="2%" mt="20px">
        <Text fontFamily="mono" fontSize={20} fontWeight="bold">
          Rules
        </Text>
        <Flex
          w="100%"
          minH={rules && rules.length > 0 ? "max-content" : "300px"}
          bg="white"
          borderRadius={2}
          mt={5}
          direction="column"
          justifyContent={rules && rules.length > 0 ? "" : "center"}
          placeItems={rules && rules.length > 0 ? "" : "center"}
          gridGap={10}
        >
          {isLoading && (
            <>
              <FieldLoading width="97%" withImage={false} />
              <FieldLoading width="97%" withImage={false} />
            </>
          )}
          {rules && rules.length > 0 ? (
            <Box>
              {rules.map((rule: any, index: number) => (
                <>
                  {index === editModal && (
                    <Modal
                      open={editModal >= 0}
                      onClose={() => setEditModal(-1)}
                      w="400px"
                      px={5}
                    >
                      <EditRulesForm
                        community={community}
                        setShowModal={setEditModal}
                        rule={rule}
                      />
                    </Modal>
                  )}
                  <Grid
                    fontFamily="mono"
                    flexDirection="column"
                    gridTemplateColumns="0.05fr 1fr 0.05fr 0.05fr"
                    py={3}
                    px={5}
                    borderBottom="1px solid #edeff1"
                    alignItems="center"
                    key={index}
                  >
                    <Text>{index + 1}</Text>
                    <Text fontSize={14}>{rule.name}</Text>
                    <Button
                      _hover={{}}
                      p={0}
                      _active={{}}
                      _focus={{}}
                      h="max-content"
                      w="max-content"
                      bg="none"
                      onClick={() => setEditModal(index)}
                    >
                      <BsPencil className="icon" size={17} />
                    </Button>
                    <Button
                      _hover={{}}
                      p={0}
                      _active={{}}
                      _focus={{}}
                      h="max-content"
                      w="max-content"
                      bg="none"
                      onClick={() => {
                        if (expanded.indexOf(index) >= 0) {
                          setExpanded(expanded.filter((exp) => exp !== index));
                        } else {
                          setExpanded(expanded.concat(index));
                        }
                      }}
                    >
                      {expanded.indexOf(index) >= 0 ? (
                        <CgMinimize className="icon" size={17} />
                      ) : (
                        <HiOutlineArrowsExpand className="icon" size={17} />
                      )}
                    </Button>
                  </Grid>
                  {expanded.indexOf(index) >= 0 && (
                    <Flex
                      bg="#EDEFF1"
                      w="100%"
                      h="max-content"
                      px={5}
                      py={3}
                      gridGap={10}
                    >
                      <Box>
                        <Text
                          fontFamily="mono"
                          fontSize={12}
                          textTransform="uppercase"
                          fontWeight="bold"
                        >
                          Report reason
                        </Text>
                        <Text
                          fontSize={13}
                          fontFamily="mono"
                          fontWeight="normal"
                        >
                          {rule.name}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontFamily="mono"
                          fontSize={12}
                          textTransform="uppercase"
                          fontWeight="bold"
                        >
                          Full Description
                        </Text>
                        <Text
                          fontSize={13}
                          fontFamily="mono"
                          fontWeight="normal"
                        >
                          {rule.description}
                        </Text>
                      </Box>
                    </Flex>
                  )}
                </>
              ))}
            </Box>
          ) : (
            <>
              <CgNotes color="gray" size={27} />
              <Text
                color="gray"
                fontSize={18}
                fontWeight="semibold"
                fontFamily="mono"
              >
                No rules yet
              </Text>
            </>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
