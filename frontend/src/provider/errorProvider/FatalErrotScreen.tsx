import { Button, Center, Text, VStack } from "@chakra-ui/react";

/**
 * React ErrorBoundary に捕捉された
 * 致命的エラー時に表示する画面
 */
export const FatalErrorScreen = () => {
  return (
    <Center minH="100vh" px={6}>
      <VStack gap={6}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="accent.300"
          textAlign="center"
        >
          エラーが発生しました
        </Text>

        <Text textAlign="center">サイトを再読み込みしてください</Text>

        <Button colorPalette="accent" onClick={() => window.location.reload()}>
          再読み込み
        </Button>
      </VStack>
    </Center>
  );
};
