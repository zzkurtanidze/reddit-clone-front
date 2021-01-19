import { Box, Image, Link } from "@chakra-ui/react";
import React from "react";
const Logo = require("../assets/reddit-logo.png");

export default function NavBar() {
  return (
    <Box w="100%" h="7vh" bg="white" px={10} py={2}>
      <Link>
        <Image src={Logo} alt={"Reddit Logo"} />
      </Link>
    </Box>
  );
}
