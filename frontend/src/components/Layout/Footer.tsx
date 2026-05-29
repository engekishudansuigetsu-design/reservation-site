import {
  Container,
  VStack,
  Text,
  Box,
  Separator,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { STAFF_CREDITS } from "../../const";
import React from "react";

export const Footer = () => (
  <Box as="footer" bg="#4c4c4c">
    <Container maxW="720" px={{ base: 4, md: 6 }}>
      <VStack py={10} alignItems="flex-start">
        <Text pb={3}>STAFF</Text>

        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          columnGap={{ base: 4, sm: 6, md: 10 }}
          rowGap={{ base: 6, sm: 8, md: 10 }}
          w="full"
        >
          {STAFF_CREDITS.map((item) =>
            item.names.length === 1 ? (
              <React.Fragment key={item.role}>
                {typeof item.names[0] === "string" ? (
                  <Text>
                    {item.role}: {item.names.join("")}
                  </Text>
                ) : (
                  <VStack alignItems="flex-start">
                    <Text>{item.role}: </Text>
                    <HStack alignItems="flex-end" gap={0}>
                      <Text>{item.names[0].name}</Text>
                      <Text fontSize="xs">({item.names[0].team} 所属)</Text>
                    </HStack>
                  </VStack>
                )}
              </React.Fragment>
            ) : (
              <VStack key={item.role} alignItems="flex-start">
                <Text>{item.role}:</Text>
                <VStack alignItems="flex-start" gap={0}>
                  {item.names.map((name) => (
                    <React.Fragment
                      key={typeof name === "string" ? name : name.name}
                    >
                      {typeof name === "string" ? (
                        <Text key={name}>{name}</Text>
                      ) : (
                        <HStack
                          key={name.name}
                          alignItems="flex-end"
                          flexWrap="wrap"
                        >
                          <Text>{name.name}</Text>
                          <Text fontSize="xs">({name.team} 所属)</Text>
                        </HStack>
                      )}
                    </React.Fragment>
                  ))}
                </VStack>
              </VStack>
            ),
          )}
        </SimpleGrid>
      </VStack>
      <Separator size="lg" />
      <VStack pt={10} pb="120px" alignItems="flex-start">
        <Text>演劇集団すいげつ</Text>
        <Text>朱居智光・難波瑞穂</Text>
        <Text as="address">engekishudan.suigetsu@gmail.com</Text>
      </VStack>
    </Container>
  </Box>
);
