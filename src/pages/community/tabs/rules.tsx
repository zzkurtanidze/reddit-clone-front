import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import FormField from "@components/common/FormField";
import FormTextarea from "@components/common/FormTextarea";
import PrimaryButton from "@components/common/PrimaryButton";
import SecondaryButton from "@components/common/SecondaryButton";
import Modal from "@components/Modal";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { CgNotes } from "react-icons/cg";

export default function RulesTab() {
  const [showModal, setShowModal] = useState<boolean>(false);

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
          <Formik
            initialValues={{ name: "", description: "" }}
            onSubmit={(data) => console.log(data)}
          >
            {({ errors, values }) => (
              <Form>
                <Flex direction="column" gridGap={2}>
                  <FormField
                    label="Rule"
                    placeholder='Rule displayed (e.g "No Photos")'
                    sufix={`${100 - values.name.length} Characters remaining`}
                    name="name"
                    type="input"
                    error={errors.name}
                  />
                  <FormTextarea
                    label="Full Description"
                    placeholder="Enter the full description of the rule"
                    name="description"
                    sufix={`${
                      500 - values.description.length
                    } Characters remaining`}
                    error={errors.description}
                  />
                  <Flex gridGap={2}>
                    <SecondaryButton
                      label="Cancel"
                      onClick={() => setShowModal(false)}
                      py="7px"
                    />
                    <PrimaryButton label="Add new rule" type="submit" />
                  </Flex>
                </Flex>
              </Form>
            )}
          </Formik>
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
          minH="300px"
          bg="white"
          borderRadius={5}
          mt={5}
          direction="column"
          justifyContent="center"
          placeItems="center"
          gridGap={10}
        >
          <CgNotes color="gray" size={27} />
          <Text
            color="gray"
            fontSize={18}
            fontWeight="semibold"
            fontFamily="mono"
          >
            No rules yet
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
