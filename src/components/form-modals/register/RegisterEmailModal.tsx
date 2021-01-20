import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

import React, { useState } from "react";
import FormField from "../../common/FormField";
import Modal from "../../Modal";

export default function RegisterModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) {
  const [stage, setStage] = useState(1);

  return stage === 1 ? (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Text fontWeight="bold">Sign up</Text>
      <Text fontSize={12} mt={15} w="60%">
        By continiuing, you agree to our User Agreement and Privacy Policy.
      </Text>
      <Box mt="50">
        <Formik
          initialValues={{ email: "" }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (values.email.length < 1) {
              errors.email = "Enter email.";
            }
            return errors;
          }}
          validateOnBlur={false}
          validateOnChange={true}
          onSubmit={(data) => console.log(data)}
        >
          {({ errors }) => (
            <Form>
              <Flex direction="column" w={"250px"} gridGap={5}>
                <FormField
                  placeholder="Email"
                  name="email"
                  type="input"
                  error={errors.email}
                />
                <Button
                  type="submit"
                  bg="#1384D7"
                  color="white"
                  px="50px"
                  borderRadius="50px"
                  _hover={{}}
                  _active={{}}
                >
                  Continue
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  ) : (
    <Modal open={showModal} onClose={() => setShowModal(false)}></Modal>
  );
}
