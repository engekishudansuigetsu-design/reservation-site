import { Box, Flex, Image } from "@chakra-ui/react";
import humanPCImg from "../../assets/flyer-pc-human.webp";
import kuragePCImg from "../../assets/flyer-pc-kurage.webp";
import humanPhoneImg from "../../assets/flyer-smartphone-human.webp";
import kuragePhoneImg from "../../assets/flyer-smartphone-kurage.webp";

import { keyframes } from "@emotion/react";
import { useState } from "react";
import { Title } from "./Title";

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
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Box position="relative">
      <Flex
        position="absolute"
        top="5%"
        left="40%"
        transform="translateX(-70%)"
        zIndex="title"
        pointerEvents="none"
      >
        <Title />
      </Flex>
      <Box
        position="relative"
        width="fit-content"
        mt={{ base: "0", md: "200px" }}
      >
        {/* 1. 水無月 画面サイズでPC用とスマホ用を切り替え */}
        <Box
          position="relative"
          width="100%"
          maxW="720px"
          mx="auto"
          as="picture"
        >
          {isLoading && <Box w="720px" h="522px" />}
          <source media="(min-width: 768px)" srcSet={humanPCImg} />
          <Image
            src={humanPhoneImg}
            alt="フライヤー"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onLoad={() => {
              setIsLoading(false);
            }}
            draggable={false}
            userSelect="none"
            pointerEvents="none"
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
            <Image
              src={kuragePhoneImg}
              alt="ニホンベニクラゲ"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              draggable={false}
              userSelect="none"
              pointerEvents="none"
            />
          </picture>
        </Box>
        <Box
          zIndex="flyerKurageGlow"
          position="absolute"
          left={{
            base: "-5%",
            md: "22%",
            sm: "10%",
          }}
          top={{
            base: "20%",
            md: "10%",
            sm: "40%",
          }}
          boxSize="300px"
          borderRadius="full"
          background="radial-gradient(circle, rgba(230,179,104,0.7) 0%, rgba(255,255,0,0) 70%)"
          animation={`${glow} 6s ease-in-out infinite`}
          transformOrigin="center"
          pointerEvents="none"
        />
      </Box>
    </Box>
  );
};
