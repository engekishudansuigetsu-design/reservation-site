import { VStack, Box, Text } from "@chakra-ui/react";
import { InViewStrong } from "./InviewStrong";

export const Introduction = () => (
  <VStack gap={8}>
    <Text fontSize="lg">
      <InViewStrong query={["ベニクラゲ"]}>ベニクラゲ</InViewStrong>
      <Box as="span" marginStart="2em" />
      不老不死と言われるクラゲ
      <br />
      命の危機に瀕すると若返るという特性を持つ
    </Text>
    <Text fontSize="lg">
      もし<InViewStrong query={["ベニクラゲ"]}>ベニクラゲ</InViewStrong>
      のように若返ることができたら、あなたは若返りますか？
    </Text>
    <Text fontSize="lg">若返ったあなたは、若返る前のあなたと同じですか？</Text>
  </VStack>
);
