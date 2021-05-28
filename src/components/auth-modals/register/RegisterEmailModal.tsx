//@ts-nocheck
import React from "react";
import { Box, Button, Divider, Flex, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";

import { checkUser } from "../../../api";
import FormField from "../../common/FormField";
import Modal from "../../Modal";
import PrimaryButton from "@components/common/PrimaryButton";

export default function RegisterModal({
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
  user: { email: string; username: string; password: string; image?: string };
}) {
  const toast = useToast();

  const handleSubmit = async ({
    email,
    imageUrl,
  }: {
    email: string;
    imageUrl?: string;
  }) => {
    let userCopy = user;
    userCopy.email = email;
    if (imageUrl) {
      userCopy.image = imageUrl;
    }
    setUser(userCopy);
    let response = await checkUser(email);
    if (response.status === 200) {
      setStage((stage: number) => stage + 1);
    } else {
      toast({
        title: response.data,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal
      withImage={true}
      open={showModal}
      onClose={() => setShowModal(false)}
    >
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
          onSubmit={handleSubmit}
        >
          {({ errors }) => (
            <Form>
              <Flex direction="column" gridGap={3} w={"250px"}>
                <GoogleLogin
                  clientId="179343367326-ii2qfpoug2srm96tuhrad1qkr4falq8a.apps.googleusercontent.com"
                  buttonText="Register with Google"
                  onSuccess={(response: GoogleLoginResponse) =>
                    handleSubmit(response.profileObj)
                  }
                  cookiePolicy={"single_host_origin"}
                />
                <Flex my={3} alignItems="center">
                  <Divider />
                  <Text
                    fontWeight="medium"
                    color="gray.300"
                    w="100%"
                    textAlign="center"
                    fontFamily="mono"
                  >
                    OR
                  </Text>
                  <Divider />
                </Flex>
                <FormField
                  placeholder="Email"
                  name="email"
                  type="input"
                  error={errors.email}
                />
                <PrimaryButton
                  label="Continue"
                  py={3}
                  type="submit"
                  borderRadius={50}
                />
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
