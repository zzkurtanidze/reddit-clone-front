import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useRef } from "react";
import FormField from "../../common/FormField";
import Modal from "../../Modal";

import * as yup from "yup";
import { UserType } from "../../../types";

const validationSchema = yup.object({
  username: yup.string().required().min(5).label("Username"),
  password: yup.string().required().min(8).label("Password"),
});

export default function RegisterUsernameModal({
  showModal,
  setShowModal,
  setStage,
  setUser,
  user,
}: {
  showModal: boolean;
  setShowModal: Function;
  setStage: Function;
  setUser: Function;
  user: { email: string; username: string; password: string };
}) {
  const formRef = useRef<HTMLFormElement | null>();

  const handleGoBack = () => {
    setStage((stage: number) => stage - 1);
  };

  const handleSubmit = () => {
    if (formRef && formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Text fontSize={20} fontWeight={600}>
        Choose your username
      </Text>
      <Text>
        Your username is how other community members will see you. This name
        will be used to credit you for things you share on Reddit. What should
        we call you?
      </Text>
      <br />
      <hr />
      <Flex>
        <Box mt="30px">
          <Formik
            //@ts-ignore
            innerRef={formRef}
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={({
              username,
              password,
            }: {
              username: string;
              password: string;
            }) => {
              let userCopy = user;
              userCopy.username = username;
              userCopy.password = password;
              console.log(userCopy);
              console.log(user);
              setUser(userCopy);
            }}
          >
            {({ errors }) => (
              <Form>
                <Flex direction="column" w={"250px"}>
                  <FormField
                    placeholder={"Choose A Username"}
                    type="text"
                    name="username"
                    error={errors.username}
                  />
                  <FormField
                    placeholder={"Password"}
                    type="password"
                    name="password"
                    error={errors.password}
                  />
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
      <br />
      <hr />
      <Flex justifyContent="space-between">
        <Box position="relative" mt="25%">
          <Button
            bg="none"
            _hover={{}}
            _active={{}}
            _focus={{}}
            onClick={handleGoBack}
          >
            Back
          </Button>
        </Box>
        <Box position="relative" mt="25%">
          <Button
            type="submit"
            bg="#1384D7"
            color="white"
            px="50px"
            borderRadius="50px"
            onClick={handleSubmit}
            _hover={{}}
            _active={{}}
          >
            Sign Up
          </Button>
        </Box>
      </Flex>
    </Modal>
  );
}
