import { Box, Text } from "@chakra-ui/react";
import { HEADER_HEIGHT, SECTION_IDS } from "../../const";
import { keyframes } from "@emotion/react";

// タイトル上に発生する水だか光だかっぽいやつのアニメーション
const rippleAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
`;

// タイトルフェードインアニメーション
const fadeInScale = keyframes`
  0% {
    opacity: 0;
    filter: blur(10px);
    transform: scale(1.3);
  }
  100% {
    opacity: 1;
    filter: blur(0);
    transform: scale(1.0);
  }
`;

export const Title = () => (
  <Box position="relative" display="inline-block">
    {/** 水面１回目 */}
    <Box
      position="absolute"
      left="10%"
      top="20%"
      // 波紋の最大サイズを指定
      boxSize="600px"
      borderRadius="50%"
      // 白い水紋（必要に応じて内側にグラデーションを付与）
      background="radial-gradient(circle, rgba(255,255,255,0) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 70%)"
      pointerEvents="none"
      // アニメーションの適用
      animation={`${rippleAnimation} 3s cubic-bezier(0.1, 0.8, 0.3, 1) 0s forwards`}
    />
    {/** 水面2回目 */}
    <Box
      position="absolute"
      left="10%"
      top="20%"
      // 波紋の最大サイズを指定
      boxSize="600px"
      borderRadius="50%"
      // 白い水紋（必要に応じて内側にグラデーションを付与）
      background="radial-gradient(circle, rgba(255,255,255,0) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 70%)"
      pointerEvents="none"
      // アニメーションの適用
      animation={`${rippleAnimation} 6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`}
    />

    <Text
      as="h1"
      fontFamily="title"
      fontSize="72px"
      color="accent.500"
      scrollMarginTop={HEADER_HEIGHT}
      id={SECTION_IDS[SECTION_IDS.top]}
      opacity="0" // 初期状態は非表示
      animation={`${fadeInScale} 1.5s 0.2s ease-out forwards`}
    >
      命あれば
      <br />
      水月も紅に会う
    </Text>
  </Box>
);
