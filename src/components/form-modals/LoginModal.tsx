//@ts-nocheck
import { Box, Button, Flex, Link, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import FormField from "../common/FormField";
import Modal from "../Modal";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";

import { login, loginWithGoogle } from "../../api/index";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function LoginModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) {
  const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(
    false
  );

  const toast = useToast();

  const onGoogleLogin = async (googleResponse: GoogleLoginResponse) => {
    const response = await loginWithGoogle(googleResponse);
    if (response.statusText === "OK") {
      window.location.reload();
    } else {
      toast({
        title: response.data,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
          onSubmit={async (data) => {
            const response = await login(data);
            if (response.status === 200) {
              toast({
                title: "Logged In Succesfully.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              toast({
                title: response.data,
                status: "error",
                duration: 9000,
                isClosable: false,
              });
            }
          }}
        >
          {({ errors }) => (
            <Form>
              <Flex direction="column" gridGap={2} w={"250px"}>
                <GoogleLogin
                  clientId="179343367326-ii2qfpoug2srm96tuhrad1qkr4falq8a.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={(response: GoogleLoginResponse) =>
                    onGoogleLogin(response)
                  }
                  onFailure={(response) => onGoogleLogin(response)}
                  cookiePolicy={"single_host_origin"}
                />
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
                  bg="transparent"
                  p={0}
                  m={0}
                  alignSelf="flex-start"
                  _hover={{}}
                  _active={{}}
                  _focus={{}}
                  color="blue.700"
                  fontSize={12}
                  textDeclor="underline"
                  onClick={() => setForgotPasswordModal(true)}
                >
                  Forgot password?
                </Button>
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
        {forgotPasswordModal && (
          <ForgotPasswordModal
            showModal={forgotPasswordModal}
            setShowModal={setForgotPasswordModal}
          />
        )}
      </Box>
    </Modal>
  );
}
