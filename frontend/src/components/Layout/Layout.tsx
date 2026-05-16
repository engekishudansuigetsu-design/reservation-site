import React from "react";
import { Header } from "./Header";
import { Container } from "@chakra-ui/react";
import { Footer } from "./Footer";

export const Layout = (props: { children: React.ReactNode }) => {
  return (
    <Box position="relative">
      <Box position="fixed" bottom={8} right={6} zIndex="10000">
        <Fabs />
      </Box>
      <Header />
      <Container w="720px" mt={4} mb={8}>
        {props.children}
      </Container>
      <Footer />
    </Box>
  );
};
