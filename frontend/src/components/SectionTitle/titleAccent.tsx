import { Box } from "@chakra-ui/react";

/**
 * WavyXIcon Component
 * 緩やかな波が交差して「X」のような形状を作る装飾コンポーネント。
 * Chakra UI v3 の `asChild` を使用して、スタイルとSVG属性の競合を回避しています。
 */
export const TitleAccent = () => (
  <Box
    asChild
    display="inline-block"
    verticalAlign="middle"
    width="100%"
    height="30px"
  >
    <svg viewBox="0 0 800 120" preserveAspectRatio="none">
      {/* 1つ目の波：左上から右下へ向かう緩やかな曲線 */}
      <path
        d="M 50,30 C 250,30 550,90 750,90"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      {/* 2つ目の波：左下から右上へ向かう緩やかな曲線 */}
      <path
        d="M 50,90 C 250,90 550,30 750,30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
    </svg>
  </Box>
);

// 使用例:
// <WavyXIcon color="white" width="400px" height="100px" />
