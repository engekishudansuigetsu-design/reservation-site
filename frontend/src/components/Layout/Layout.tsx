import React from "react";
import { Header } from "./Header";
import { Box, Container, Flex } from "@chakra-ui/react";
import { Footer } from "./Footer";
import { Fabs } from "./Fabs";
import { ResponsiveTopFlyer } from "../Flyer/ResponsiveTopFlyer";

export const Layout = (props: { children: React.ReactNode }) => {
  return (
    <Box position="relative">
      <Box
        position="fixed"
        bottom={8}
        right={6}
        zIndex="fab"
        pointerEvents="none"
      >
        <Fabs />
      </Box>
      <Box position="sticky" top={0} zIndex="header">
        <Header />
      </Box>

      <Flex justifyContent="center">
        <ResponsiveTopFlyer />
      </Flex>
      <Container maxW="container.md" px={6} mt={4} mb={8} zIndex="content">
        {props.children}
      </Container>
      <Footer />
    </Box>
  );
};
