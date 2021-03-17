//@ts-nocheck
import React from "react";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";

import { checkUser } from "../../../api";
import FormField from "../../common/FormField";
import Modal from "../../Modal";

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
    console.log(userCopy);
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
              <Flex direction="column" w={"250px"}>
                <GoogleLogin
                  clientId="179343367326-ii2qfpoug2srm96tuhrad1qkr4falq8a.apps.googleusercontent.com"
                  buttonText="Register with Google"
                  onSuccess={(response: GoogleLoginResponse) =>
                    handleSubmit(response.profileObj)
                  }
                  cookiePolicy={"single_host_origin"}
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
  );
}
