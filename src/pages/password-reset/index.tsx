import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import FormField from "@components/common/FormField";
import jwt_decode from "jwt-decode";
//@ts-ignore
import { submitNewPassword } from "@api";
import { useToast } from "@chakra-ui/toast";

export default function PasswordResetPage({ match }: { match: any }) {
  const [brokenLink, setBrokenLink] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const token = match.params.token;
  const toast = useToast();

  useEffect(() => {
    const decoded: { expire: number; userId: string } = jwt_decode(token);
    const time = Math.floor(Date.now() / 1000);
    if (time > decoded.expire) {
      setBrokenLink(true);
    }
    setUserId(decoded.userId);
  }, []);

  return brokenLink ? (
    <Flex alignItems="center" h="100vh" justifyContent="center">
      <Text textAlign="center" fontSize={50} fontFamily="mono">
        Link is expired.
      </Text>
    </Flex>
  ) : (
    <Flex alignItems="center" gridGap={5}>
      <Image
        src="https://www.redditstatic.com/accountmanager/bbb584033aa89e39bad69436c504c9bd.png"
        w="150px"
        objectFit="cover"
        h="100vh"
      />
      <Box>
        <Image
          src="https://www.redditstatic.com/accountmanager/18e257d5fdea817c0f12cccf8867d930.svg"
          alt="Reddit-logo"
        />
        <Text fontWeight="bold" fontFamily="mono">
          Reset your password
        </Text>
        <Text fontSize={14} mb={5} fontfamily="mono">
          Choose a new password here, then log in to your account.
        </Text>
        <Formik
          initialValues={{ password: "", repeatPassword: "" }}
          validate={({ password, repeatPassword }) => {
            const errors: Record<string, string> = {};

            if (password !== repeatPassword) {
              errors.repeatPassword = "Passwords are not equal.";
            }
            if (password.length < 4) {
              errors.password =
                "Password must be at least 5 characters length.";
            }

            return errors;
          }}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async ({ password }) => {
            let data = { password, userId };
            let response = await submitNewPassword(data);
            if (response.statusText === "OK") {
              toast({
                title: response.data,
                status: "success",
                duration: 8000,
                isClosable: true,
              });
              setTimeout(() => {
                window.location.replace("/");
              }, 1000);
            }
          }}
        >
          {({ errors }) => (
            <Form>
              <Flex gridGap={3} flexDirection="column" w="350px">
                <FormField
                  placeholder="New Password"
                  type="password"
                  name="password"
                  error={errors.password}
                />
                <FormField
                  placeholder="Repeat New Password"
                  type="password"
                  name="repeatPassword"
                  error={errors.repeatPassword}
                />
                <FormControl>
                  <Flex gridGap={2} alignItems="flex-start">
                    <Field type="checkbox" name="accept" id="log-out" />
                    <FormLabel
                      fontSize={12}
                      fontFamily="mono"
                      htmlFor="log-out"
                    >
                      Changing your password logs you out of all browsers on
                      your device(s). Checking this box also logs you out of all
                      apps you have authorized.
                    </FormLabel>
                  </Flex>
                </FormControl>
                <Button
                  type="submit"
                  color="white"
                  w="max-content"
                  fontFamily="mono"
                  fontSize={14}
                  _active={{}}
                  _hover={{}}
                  bg="#0079d3"
                >
                  SET PASSWORD
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
