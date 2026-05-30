import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

const markerReveal = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const textColor = keyframes`
  from {
    color: inherit;
  }
  to {
    color: #140a00;
  }
`;

type InViewStrongProps = {
  children: string;
  query: string | string[];
};

export const InViewStrong = ({ children, query }: InViewStrongProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 💡 調整ポイント1: 発火してからアニメーション開始までの「タメ（ディレイ）」を作る
          // ユーザーがスクロールをピタッと止める、または文字を認識する一瞬の隙を作ります
          requestAnimationFrame(() => {
            setTimeout(() => {
              setIsInView(true);
            }, 100); // 150ms から 100ms に微調整してレスポンシブに
          });
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0,
        // 💡 調整ポイント2: 画面の下端から「45%」上がった位置（ほぼ画面中央）で発火させる！
        // これにより、ユーザーの視界のど真ん中に文字が入った瞬間にアニメーションが始まります。
        rootMargin: "0px 0px -45% 0px",
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const queries = Array.isArray(query) ? query : [query];
  const escapedQueries = queries
    .map((q) => q.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"))
    .filter(Boolean);

  if (escapedQueries.length === 0) {
    return (
      <Box as="span" ref={ref}>
        {children}
      </Box>
    );
  }

  const regex = new RegExp(`(${escapedQueries.join("|")})`, "g");
  const parts = children.split(regex);

  return (
    <Box as="span" ref={ref} display="inline">
      {parts.map((part, index) => {
        const isMatch = queries.includes(part);

        if (!isMatch) {
          return <span key={index}>{part}</span>;
        }

        return (
          <Box
            key={index}
            as="span"
            position="relative"
            display="inline"
            fontWeight="bold"
            mx="0.12em"
            px="0.12em"
            py="0.04em"
            isolation="isolate"
            // 💡 調整ポイント3: 文字色変化のディレイをマーカーの速度に完全に同期
            animation={
              isInView ? `${textColor} 0.15s linear 0.4s forwards` : undefined
            }
          >
            {/* マーカー本体 */}
            <Box
              as="span"
              position="absolute"
              inset="0px -0.12em"
              bg="#cf8c2f"
              borderRadius="0.15em"
              transformOrigin="left center"
              transform="scaleX(0)"
              zIndex={-1}
              willChange="transform"
              // 💡 調整ポイント4: 線の伸びる速度を「0.6s」から「0.5s」へ少しシャープに
              // 視線が文字に乗った瞬間にシュッと気持ちよく走る速度感にします
              animation={
                isInView
                  ? `${markerReveal} 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards`
                  : undefined
              }
            />
            {part}
          </Box>
        );
      })}
    </Box>
  );
};
