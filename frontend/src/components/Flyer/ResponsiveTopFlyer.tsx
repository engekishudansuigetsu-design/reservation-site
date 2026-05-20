import { Box } from "@chakra-ui/react";
import humanPCImg from "../../assets/flyer-pc-human.webp";
import kuragePCImg from "../../assets/flyer-pc-kurage.webp";
import humanPhoneImg from "../../assets/flyer-smartphone-human.webp";
import kuragePhoneImg from "../../assets/flyer-smartphone-kurage.webp";

import { keyframes } from "@emotion/react";

const glow = keyframes`
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.2;
  }

  50% {
    transform: scale(1.2);
    opacity: 9;
  }
`;

export const ResponsiveTopFlyer = () => {
  return (
    <Box
      position="relative"
      width="100%"
      height="fit-content"
      overflow="hidden"
    >
      {/* 1. 水無月 画面サイズでPC用とスマホ用を切り替え */}
      <Box as="picture" width="100%" height="100%">
        <source media="(min-width: 768px)" srcSet={humanPCImg} />
        <img
          src={humanPhoneImg}
          alt="フライヤー"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      {/* 2. クラゲ */}
      <Box
        position="absolute"
        zIndex="flyerKurage"
        // 位置のレスポンシブ指定
        top={0}
        left={0}
      >
        <picture>
          <source media="(min-width: 768px)" srcSet={kuragePCImg} />
          <img
            src={kuragePhoneImg}
            alt="ニホンベニクラゲ"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </picture>
      </Box>
      <Box
        zIndex="flyerKurageGlow"
        position="absolute"
        left={{
          base: "8",
          md: "22%",
        }}
        top={{
          base: "30%",
          md: "10%",
        }}
        boxSize="300px"
        borderRadius="full"
        background="radial-gradient(circle, rgba(230,179,104,0.7) 0%, rgba(255,255,0,0) 70%)"
        animation={`${glow} 6s ease-in-out infinite`}
        transformOrigin="center"
        pointerEvents="none"
      />
    </Box>
  );
};
