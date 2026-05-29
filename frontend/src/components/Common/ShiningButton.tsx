import { Button, type ButtonProps } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import type React from "react";

type Props = { children: React.ReactNode } & ButtonProps;

const shine = keyframes`
  0% {
    transform: translateX(-180%) skewX(-24deg);
    opacity: 0;
  }

  10% {
    opacity: 0;
  }

  18% {
    opacity: 1;
  }

  30% {
    opacity: 0.85;
  }

  42% {
    transform: translateX(320%) skewX(-24deg);
    opacity: 0;
  }

  100% {
    transform: translateX(320%) skewX(-24deg);
    opacity: 0;
  }
`;

/** 30sにいっぺんくらいでキランとするButton */
export const ShiningButton = ({ children, ...props }: Props) => (
  <Button
    size="xl"
    w="230px"
    {...props}
    position="relative"
    overflow="hidden"
    isolation="isolate"
    _before={{
      content: '""',

      position: "absolute",

      top: 0,
      left: 0,

      width: "48px",
      height: "100%",

      pointerEvents: "none",

      zIndex: 1,

      opacity: 0,

      transform: "translateX(-160%) skewX(-24deg)",

      background: `
          linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.22) 20%,
            rgba(255,255,255,0.95) 50%,
            rgba(255,255,255,0.22) 80%,
            rgba(255,255,255,0) 100%
          )
        `,

      animation: `${shine} 8s ease-in-out infinite`,
    }}
    boxShadow="0 4px 12px 0 rgba(255, 248, 237, 0.5)"
  >
    {children}
  </Button>
);
