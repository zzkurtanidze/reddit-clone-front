import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";

export default function FixedElement({
  children,
  scrollY = 380,
  top = "75px",
  ...props
}: {
  children: any;
  top?: string;
  scrollY?: number;
  [x: string]: any;
}) {
  const [fixed, setFixed] = useState<boolean>(false);
  const [elementWidth, setElementWidth] = useState<number | undefined>(
    document.getElementById("scrollable")?.clientWidth
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setElementWidth(document.getElementById("scrollable")?.clientWidth);

    return () => {
      window.removeEventListener("scroll", () => {});
      setElementWidth(0);
    };
  }, [window]);

  useEffect(() => {
    setElementWidth(document.getElementById("scrollable")?.clientWidth);

    return () => {
      setElementWidth(0);
    };
  }, [window]);

  const handleScroll = () => {
    if (window.scrollY >= scrollY) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  return (
    <Box id="scrollable" position="relative">
      <Box
        position={fixed ? "fixed" : "sticky"}
        top="75px"
        w={elementWidth ? elementWidth : "inherit"}
        maxW="100%"
        {...props}
      >
        {children}
      </Box>
    </Box>
  );
}
