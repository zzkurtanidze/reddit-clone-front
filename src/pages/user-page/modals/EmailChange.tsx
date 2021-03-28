import Modal from "../../../components/Modal";
import React from "react";
import { IoMdMail } from "react-icons/io";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { FaInfoCircle } from "react-icons/fa";
import { Form, Formik } from "formik";
import FormField from "../../../components/common/FormField";
import { Button } from "@chakra-ui/button";

export default function EmailChange({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  return (
    <Modal open={open} onClose={() => setOpen(false)} width="400px">
      <Flex alignItems="center" gridGap={4}>
        <Box
          position="relative"
          p={3}
          borderRadius={50}
          bg="#D3ECFC"
          w="max-content"
        >
          <IoMdMail color="#23A0ED" size={25} />
          <Box
            position="absolute"
            top="7px"
            right="9px"
            bg="white"
            borderRadius={50}
            border="1px solid white"
          >
            <FaInfoCircle size={15} color="#FB4729" />
          </Box>
        </Box>
        <Text fontSize={18} fontWeight="bold" fontFamily="mono">
          Update your email
        </Text>
      </Flex>
      <Text fontFamily="mono" my={2}>
        Update your email below. There will be a new verification email sent
        that you will need to use to verify this new email.
      </Text>
      <Formik
        initialValues={{ password: "", newEmail: "" }}
        onSubmit={(data) => console.log(data)}
      >
        {({ errors }) => (
          <Form>
            <FormField
              placeholder="Current Password"
              type="password"
              error={errors.password}
              name="password"
            />
            <FormField
              placeholder="New Email"
              type="email"
              error={errors.newEmail}
              name="newEmail"
            />
            <Button
              type="submit"
              borderRadius={40}
              px={4}
              py={2}
              float="right"
              mb={5}
              h="max-content"
              bg="#0079d3"
              fontSize={12}
              color="white"
            >
              Save email
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
