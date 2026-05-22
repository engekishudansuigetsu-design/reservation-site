import React from "react";
import { Header } from "./Header";
import { Box, Container } from "@chakra-ui/react";
import { Footer } from "./Footer";
import { Fabs } from "./Fabs";
import { Orbs } from "./Orbs";

export const Layout = (props: { children: React.ReactNode }) => {
  return (
    <Box position="relative">
      <Box position="fixed" bottom={8} right={6} zIndex="fab">
        <Fabs />
      </Box>
      <Box position="sticky" top={0} zIndex="header">
        <Header />
      </Box>
      <Container
        maxW="container.md"
        px={{ base: 4, md: 0 }}
        mt={4}
        mb={8}
        zIndex="content"
      >
        {props.children}
      </Container>
      <Orbs />
      <Box position="relative" zIndex="footer">
        <Footer />
      </Box>
    </Box>
  );
};
