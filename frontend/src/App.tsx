import { Layout } from "./components/Layout/Layout";
import { Flex, Text, VStack } from "@chakra-ui/react";

import { SectionTitle } from "./components/SectionTitle/SectionTitle";
import { InfoTable } from "./components/InfoTable";
import { Introduction } from "./components/Introduction/Introduction";
import { CharacterGrid } from "./components/Characters/CharactersGrid";

import { Reservation } from "./components/Reservation/Reservation";

function App() {
  return (
    <Layout>
      <SectionTitle id="introduction" />
      <Introduction />

      <SectionTitle id="characters" />
      <VStack gap={8}>
        <CharacterGrid />
        <VStack gap={0} mt="2">
          <Text fontSize="md" fontWeight="bold">
            &
          </Text>
          <Text fontSize="md" fontWeight="bold">
            アンサンブル
          </Text>
          <Text fontSize="sm" color="whiteAlpha.900">
            やま
          </Text>
          <Text fontSize="xs" color="whiteAlpha.600">
            しゃんぐりら所属
          </Text>
        </VStack>
      </VStack>

      <SectionTitle id="performance" />
      <Flex justifyContent="center">
        <InfoTable />
      </Flex>

      <SectionTitle id="reservation" />
      <Reservation />
    </Layout>
  );
}

export default App;
