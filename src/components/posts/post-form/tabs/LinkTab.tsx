import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function LinkTab({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const urlReg = /https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}[\/\?]\S*/;
    if (value) {
      if (!urlReg.test(value)) {
        setError("You did not entered valid URL.");
      } else {
        setError(undefined);
      }
    }
  }, [value]);

  return (
    <Box my={2}>
      <FormControl isInvalid={error ? true : false}>
        <Textarea
          placeholder="Url"
          name="link"
          value={value}
          onChange={onChange}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
}
