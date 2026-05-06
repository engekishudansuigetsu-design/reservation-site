import { Layout } from "./components/Layout/Layout";
import { useGetReserve, usePostReserve } from "./lib/gas/default/default";
import { Box, Text } from "@chakra-ui/react";
import { SECTION_IDS, HEADERHEIGHT, MENUITEMS, } from "./const";

function App() {
  const { data } = useGetReserve();
  const { mutateAsync: postReserve } = usePostReserve();

  return (
    <>
      <Layout>
        <Text as="h2" fontSize="xl" scrollMarginTop={HEADERHEIGHT} id={SECTION_IDS.introduction}>
          {MENUITEMS.find((item) => item.id === SECTION_IDS.introduction)?.label}
        </Text>
        <Text>
          あああああああああああああああああああああああ
        </Text>
        <Text>
          ああああああああああああああああああああああああ
        </Text>
        <Text>
          ああああああああああああああああああああああああ
        </Text>

        <Box h="1000px" bg="blue.100">
          <Text as="h2" fontSize="xl" scrollMarginTop={HEADERHEIGHT} id={SECTION_IDS.characters}>
            {MENUITEMS.find((item) => item.id === SECTION_IDS.characters)?.label}
          </Text>
        </Box>

        <Box h="1000px" bg="blue.100">
          <Text as="h2" fontSize="xl" scrollMarginTop={HEADERHEIGHT} id={SECTION_IDS.performance}>
            {MENUITEMS.find((item) => item.id === SECTION_IDS.performance)?.label}
          </Text>
        </Box>


      </Layout>
    </>
  );

}

export default App;
