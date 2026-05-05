import { Layout } from "./components/Layout/Layout";
import { useGetReserve, usePostReserve } from "./lib/gas/default/default";
import { Box, Text  } from "@chakra-ui/react";
import { SECTION_IDS } from "./const.tsx";

function App() {
  const { data } = useGetReserve();
  const { mutateAsync: postReserve } = usePostReserve();
  
return (
  <>
    <Layout>
      <Text as="h2" fontSize="xl" id={SECTION_IDS.introduction}>
        あらすじ
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

      <Box h="100px" bg="blue.100">
        <Text as="h2" fontSize="xl" id={SECTION_IDS.characters}>
          登場人物
        </Text>
      </Box>

      <Box h="100px" bg="blue.100">
        <Text as="h2" fontSize="xl" id={SECTION_IDS.performance}>
          公演情報
        </Text>
      </Box>


      <Text as="h2" fontSize="xl" id={SECTION_IDS.reservation}>
        予約
      </Text>
      
      <form></form>
    </Layout>
  </>
);

}

export default App;
