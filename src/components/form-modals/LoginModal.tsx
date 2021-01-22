import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import FormField from "../common/FormField";
import Modal from "../Modal";

export default function LoginModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) {
  return (
    <Modal withImage open={showModal} onClose={() => setShowModal(false)}>
      <Text fontWeight="bold">Login</Text>
      <Text fontSize={12} mt={15} w="60%">
        By continiuing, you agree to our User Agreement and Privacy Policy.
      </Text>
      <Box mt="50">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors: Record<string, string> = {};

            if (values.email.length < 1) {
              errors.email = "Enter email.";
            }
            if (values.password.length < 1) {
              errors.password = "Enter password.";
            }

            return errors;
          }}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(data) => console.log(data)}
        >
          {({ errors }) => (
            <Form>
              <Flex direction="column" w={"250px"}>
                <FormField
                  placeholder="Email"
                  name="email"
                  type="input"
                  error={errors.email}
                />
                <FormField
                  placeholder="Password"
                  name="password"
                  type="password"
                  error={errors.password}
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
                  Submit
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
