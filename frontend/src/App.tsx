import "./App.css";
import { useGetReserve, usePostReserve } from "./lib/gas/default/default";
import { Box, Text  } from "@chakra-ui/react";

function App() {
  const { data } = useGetReserve();
  const { mutateAsync: postReserve } = usePostReserve();
  
return (
  <>
    <div className="App">
      <Text as="h2" fontSize="xl">あらすじ</Text>
      <Text>
        あああああああああああああああああああああああ
      </Text>
      <Text>
        ああああああああああああああああああああああああ
      </Text>
      <Text>
        ああああああああああああああああああああああああ
      </Text>
    </div>

    <div>
      <Text as="h2" fontSize="xl">登場人物</Text>
      <Box h="100px" bg="blue.100" />
    </div>

    <div>
      <Text as="h2" fontSize="xl">公演情報</Text>
      <Box h="100px" bg="blue.100" />
    </div>

    <div>
      <Text as="h2" fontSize="xl">予約</Text>
      <form></form>
    </div>
  </>
);

}

export default App;
