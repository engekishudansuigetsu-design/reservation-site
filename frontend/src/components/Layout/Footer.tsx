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

export const Footer = () => (
  <Box as="footer" bg="#4c4c4c">
    <Container w="5xl">
      <VStack py={10} alignItems="flex-start">
        <Text>STAFF</Text>

        <SimpleGrid columnGap="10" rowGap="8" w="full" columns={[2, null, 3]}>
          {STAFF_CREDITS.map((item) =>
            item.names.length === 1 ? (
              <>
                {typeof item.names[0] === "string" ? (
                  <Text key={item.role}>
                    {item.role}: {item.names.join("")}
                  </Text>
                ) : (
                  <VStack key={item.role} alignItems="flex-start">
                    <Text>{item.role}: </Text>
                    <HStack alignItems="flex-end" gap={0} pl={3}>
                      <Text>{item.names[0].name}</Text>
                      <Text fontSize="xs">({item.names[0].team} 所属)</Text>
                    </HStack>
                  </VStack>
                )}
              </>
            ) : (
              <VStack key={item.role} alignItems="flex-start">
                <Text>{item.role}:</Text>
                <VStack alignItems="flex-start" gap={0}>
                  {item.names.map((name) => (
                    <>
                      {typeof name === "string" ? (
                        <Text key={name}>{name}</Text>
                      ) : (
                        <HStack key={name.name} alignItems="flex-end" pl={3}>
                          <Text>{name.name}</Text>
                          <Text fontSize="xs">({name.team} 所属)</Text>
                        </HStack>
                      )}
                    </>
                  ))}
                </VStack>
              </VStack>
            ),
          )}
        </SimpleGrid>
      </VStack>
      <Separator size="lg" />
      <VStack py={10} alignItems="flex-start">
        <Text>演劇集団すいげつ</Text>
        <Text>朱居智光・難波瑞穂</Text>
        <Text as="address">engekishudan.suigetsu@gmail.com</Text>
      </VStack>
    </Container>
  </Box>
);
