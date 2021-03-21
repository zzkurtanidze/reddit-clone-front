import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { expectsResolvedDragConstraints } from "framer-motion/types/gestures/drag/VisualElementDragControls";
import { valueScaleCorrection } from "framer-motion/types/render/dom/projection/scale-correction";
import React from "react";
import FormField from "../common/FormField";
import PrimaryButton from "../common/PrimaryButton";
import Modal from "../Modal";

export default function ForgotPasswordModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) {
  return (
    <Modal open={showModal} width="500px" onClose={() => setShowModal(false)}>
      <Text fontWeight="bold">Forgot your password?</Text>
      <br />
      <Text fontSize={14} fontFamily="mono">
        Enter your email address
      </Text>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(data) => console.log(data)}
        validate={({ email }) => {
          const errors: Record<string, string> = {};

          if (email.length < 1) {
            errors.email = "Enter email.";
          }

          return errors;
        }}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors }) => (
          <Form>
            <Flex direction="column" gridGap={2}>
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
