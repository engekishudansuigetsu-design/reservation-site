import { Layout } from "./components/Layout/Layout";
import { useGetReserve, usePostReserve } from "./lib/gas/default/default";
import { Box, Text } from "@chakra-ui/react";
import { SECTION_IDS, HEADER_HEIGHT, MENU_MAP } from "./const";
import { ReservationForm } from "./components/Reservation/Form";

function App() {
  const { data } = useGetReserve();
  const { mutateAsync: postReserve } = usePostReserve();

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

      <Box h="1000px" bg="blue.100">
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
          <ReservationForm />
        </Text>
      </Box>
    </Layout>
  );
}

export default App;
