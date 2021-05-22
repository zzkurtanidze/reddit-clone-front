import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/layout";
import PrimaryButton from "@components/common/PrimaryButton";
import Modal from "@components/Modal";
import React, { useEffect, useState } from "react";
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
//@ts-ignore
import { reorderRules } from "@api/";
import { useToast } from "@chakra-ui/toast";
import { RiDragMove2Line } from "react-icons/ri";

export default function RulesTab({ community }: { community: CommunityType }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { rules, isLoading } = getRules(community);
  const [expanded, setExpanded] = useState<number[]>([]);
  const [editModal, setEditModal] = useState<number>(-1);
  const [orderedRules, setOrderedRules] = useState<any[]>([]);
  const [reorderMode, setReorderMode] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    if (rules) {
      setOrderedRules(rules);
    }
  }, [rules]);

  const handleDragEnd = async (result: any) => {
    console.log(result);
    if (!result.destination) return;
    const newItems = [...orderedRules];
    // with new array we should find previous index and remove from the array
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    // next we have to find destination index and inject our item to the array
    newItems.splice(result.destination.index, 0, reorderedItem);
    // update our state
    setOrderedRules(newItems);

    if (result.destination.index !== result.source.index) {
      const response = await reorderRules(community, newItems);
      if (response.statusText === "OK") {
        toast({
          title: "Succesfully reordered rules.",
        });
      }
    }
  };

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
        alignItems="center"
        gridGap={5}
      >
        <Button
          bg="none"
          _active={{}}
          _focus={{}}
          _hover={{ bg: "gray.200" }}
          borderRadius={50}
          px={3}
          py={2}
          transition="0"
          h="max-content"
          color="#0079D3"
          fontFaimly="mono"
          fontWeight="bold"
          fontSize={14}
          onClick={() => setReorderMode(!reorderMode)}
        >
          {!reorderMode ? "Reorder rules" : "Done"}
        </Button>
        <PrimaryButton
          label="Add Rule"
          onClick={() => setShowModal(true)}
          borderRadius={50}
          px={4}
          disabled={reorderMode}
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
        >
          {isLoading && (
            <>
              <FieldLoading width="97%" withImage={false} />
              <FieldLoading width="97%" withImage={false} />
            </>
          )}
          {orderedRules && orderedRules.length > 0 ? (
            reorderMode ? (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="rules">
                  {(provided) => (
                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                      {orderedRules.map((rule: any, index: number) => (
                        <Box key={index}>
                          <Draggable
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <Grid
                                fontFamily="mono"
                                flexDirection="column"
                                gridTemplateColumns="0.05fr 1fr 0.05fr"
                                py={3}
                                px={5}
                                bg="white"
                                borderBottom="1px solid #edeff1"
                                alignItems="center"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                key={index}
                              >
                                <Text>{index + 1}</Text>
                                <Text fontSize={14}>{rule.name}</Text>
                                <Box cursor="move">
                                  <RiDragMove2Line size={18} color="gray" />
                                </Box>
                              </Grid>
                            )}
                          </Draggable>
                        </Box>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <Box h="max-content">
                {orderedRules.map((rule: any, index: number) => (
                  <Box key={index}>
                    {index === editModal && (
                      <Modal
                        open={editModal >= 0}
                        onClose={() => setEditModal(-1)}
                        w="400px"
                        px={5}
                      >
                        <EditRulesForm
                          community={community}
                          onClose={() => setEditModal(-1)}
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
                      bg="white"
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
                            setExpanded(
                              expanded.filter((exp) => exp !== index)
                            );
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
                        maxW="100%"
                        h="max-content"
                        px={5}
                        py={3}
                        gridGap={20}
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
                            Created At
                          </Text>
                          <Text
                            fontSize={13}
                            fontFamily="mono"
                            fontWeight="normal"
                          >
                            {rule.date}
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
                            maxW="400px"
                          >
                            {rule.description}
                          </Text>
                        </Box>
                      </Flex>
                    )}
                  </Box>
                ))}
              </Box>
            )
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
