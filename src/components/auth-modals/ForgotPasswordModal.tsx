import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Form, Formik } from "formik";
import React from "react";
import { resetPassword } from "../../api";
import FormField from "../common/FormField";
import Modal from "../Modal";

export default function ForgotPasswordModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) {
  const toast = useToast();

  const handleReset = async (data: { username: string; email: string }) => {
    const response = await resetPassword(data);

    if (response.statusText === "OK") {
      toast({
        title: "Email has been sent succesfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: response.data,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal open={showModal} width="500px" onClose={() => setShowModal(false)}>
      <img
        src="https://www.redditstatic.com/accountmanager/18e257d5fdea817c0f12cccf8867d930.svg"
        alt="Reddit-logo"
      />
      <br />
      <Text fontWeight="bold">Reset your password</Text>
      <Text fontSize={14} fontFamily="mono">
        Tell us the username and email address associated with your Reddit
        account, and we’ll send you an email with a link to reset your password.
      </Text>
      <br />
      <Formik
        initialValues={{ username: "", email: "" }}
        onSubmit={async (data) => handleReset(data)}
        validate={({ username, email }) => {
          const errors: Record<string, string> = {};

          if (email.length < 1) {
            errors.email = "Enter email.";
          }

          if (username.length < 1) {
            errors.username = "Enter username.";
          }

          return errors;
        }}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors }) => (
          <Form>
            <Flex direction="column" gridGap={3}>
              <FormField
                placeholder="Username"
                name="username"
                type="input"
                error={errors.username}
              />
              <FormField
                placeholder="Email"
                name="email"
                type="input"
                error={errors.email}
              />
              <Button
                type="submit"
                bg="#1384D7"
                _hover={{}}
                _active={{}}
                color="white"
              >
                Send Mail
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
