import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";

export default function FixedElement({
  children,
  scrollY = 380,
}: {
  children: any;
  scrollY?: number;
}) {
  const [fixed, setFixed] = useState<boolean>(false);
  const [elementWidth, setElementWidth] = useState<number | undefined>(
    document.getElementById("scrollable")?.clientWidth
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setElementWidth(document.getElementById("scrollable")?.clientWidth);
  }, []);

  useEffect(() => {
    setElementWidth(document.getElementById("scrollable")?.clientWidth);
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
      >
        {children}
      </Box>
    </Box>
  );
}
