import { Layout } from "./components/Layout/Layout";
import { Box, Text } from "@chakra-ui/react";
import { SECTION_IDS, HEADER_HEIGHT, MENU_MAP } from "./const";

import { Reservation } from "./components/Reservation/Reservation";

function App() {
  return (
    <Layout>
      <Text
        as="h2"
        fontSize="xl"
        scrollMarginTop={HEADER_HEIGHT}
        id={SECTION_IDS[SECTION_IDS.introduction]}
      >
        {MENU_MAP.introduction}
      </Text>
      <Text>あああああああああああああああああああああああ</Text>
      <Text>ああああああああああああああああああああああああ</Text>
      <Text>ああああああああああああああああああああああああ</Text>

      <Box h="100px" bg="blue.100">
        <Text
          as="h2"
          fontSize="xl"
          scrollMarginTop={HEADER_HEIGHT}
          id={SECTION_IDS.characters}
        >
          {MENU_MAP[SECTION_IDS.characters]}
        </Text>
      </Box>

      <Box h="1000px" bg="blue.100">
        <Text
          as="h2"
          fontSize="xl"
          scrollMarginTop={HEADER_HEIGHT}
          id={SECTION_IDS.performance}
        >
          {MENU_MAP[SECTION_IDS.performance]}
        </Text>
      </Box>

      <Box>
        <Text
          as="h2"
          fontSize="xl"
          scrollMarginTop={HEADER_HEIGHT}
          id={SECTION_IDS.reservation}
        >
          {MENU_MAP[SECTION_IDS.reservation]}
        </Text>
        <Reservation />
      </Box>
    </Layout>
  );
}

export default App;
