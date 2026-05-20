import { Layout } from "./components/Layout/Layout";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Title } from "./components/Flyer/Title";
import { ResponsiveTopFlyer } from "./components/Flyer/ResponsiveTopFlyer";

import { ReservationForm } from "./components/Reservation/Form";
import { SectionTitle } from "./components/SectionTitle/SectionTitle";
import { InfoTable } from "./components/InfoTable";
import { Introduction } from "./components/Introduction/Introduction";
import { CharacterGrid } from "./components/Characters/CharactersGrid";

function App() {
  return (
    <Layout>
      <Box position="relative" w="100%">
        <Box position="relative" top={10} zIndex="title">
          <Title />
        </Box>
        <ResponsiveTopFlyer />

        <SectionTitle id="introduction" />
        <Introduction />

        <SectionTitle id="characters" />
        <VStack gap={8}>
          <CharacterGrid />
          <VStack gap={0} mt="2">
            <Text fontSize="md" fontWeight="bold">
              アンサンブル
            </Text>
            <Text fontSize="sm" color="whiteAlpha.900">
              やま
            </Text>
            <Text fontSize="xs" color="whiteAlpha.600">
              (しゃんぐりら所属)
            </Text>
          </VStack>
        </VStack>

        <SectionTitle id="performance" />
        <InfoTable />

        <SectionTitle id="reservation" />
        <ReservationForm />
      </Box>
    </Layout>
  );
}

export default App;
