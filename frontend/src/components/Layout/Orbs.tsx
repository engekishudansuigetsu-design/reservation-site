import { Box } from "@chakra-ui/react";
import { useRef, useEffect } from "react";

/**
 * STREAMING_CHUNK: Defining the Orb class for high-performance DOM-based animation.
 * ReactのState管理では要素数が多いと重くなるため、DOMを直接操作してGPU加速を利用します。
 */
class Firefly {
  private el: HTMLDivElement;
  public x: number = 0;
  public y: number = 0;
  private vx: number = 0;
  private vy: number = 0;
  private alpha: number = 0;
  private alphaStep: number = 0;
  private size: number = 0;

  constructor(parent: HTMLDivElement) {
    this.el = document.createElement("div");
    Object.assign(this.el.style, {
      position: "absolute",
      borderRadius: "50%",
      filter: "blur(0.5px)",
      mixBlendMode: "screen",
      willChange: "transform, opacity",
      backgroundColor: "#fff",
      boxShadow: "0 0 3px 1px rgba(255, 255, 255, 0.8)",
      pointerEvents: "none",
    });
    parent.appendChild(this.el);
    this.reset();
  }

  reset() {
    // 極小の点（1px〜2.5px）
    this.size = Math.random() * 1.5 + 1;
    this.el.style.width = `${this.size}px`;
    this.el.style.height = `${this.size}px`;

    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;

    // 空気の揺らぎのような超低速
    this.vx = (Math.random() - 0.5) * 0.12;
    this.vy = (Math.random() - 0.5) * 0.12;

    this.alpha = Math.random() * Math.PI * 2;
    this.alphaStep = Math.random() * 0.012 + 0.005;
  }

  update() {
    this.vx += (Math.random() - 0.5) * 0.004;
    this.vy += (Math.random() - 0.5) * 0.004;

    this.x += this.vx;
    this.y += this.vy;

    const margin = 50;
    if (this.x < -margin) this.x = window.innerWidth + margin;
    if (this.x > window.innerWidth + margin) this.x = -margin;
    if (this.y < -margin) this.y = window.innerHeight + margin;
    if (this.y > window.innerHeight + margin) this.y = -margin;

    // サイン波の累乗で、光っている時間を短く、鋭い瞬きにする
    this.alpha += this.alphaStep;
    const opacity = Math.pow(Math.max(0, Math.sin(this.alpha) * 0.5 + 0.5), 4);

    this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
    this.el.style.opacity = opacity.toString();
  }

  destroy() {
    this.el.remove();
  }
}

/** 画面背景にふぁ〜〜〜...と白いのが舞うアニメーションを管理するコンポーネント */
export const Orbs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fireflyCount = 70;
    const fireflies: Firefly[] = [];
    let animationFrameId: number;

    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push(new Firefly(container));
    }

    const animate = () => {
      fireflies.forEach((f) => f.update());
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      fireflies.forEach((f) => {
        if (f.x > window.innerWidth) f.reset();
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      fireflies.forEach((f) => f.destroy());
    };
  }, []);

  return (
    <>
      <Box
        inset={0}
        backgroundColor="transparent"
        position="fixed"
        overflow="hidden"
        zIndex="backgroundBaseWrapper"
      >
        {/* 背景ベース */}
        <Box
          position="absolute"
          inset={0}
          pointerEvents="none"
          zIndex="backgroundBG"
        />

        {/* 蛍コンテナ */}
        <Box
          ref={containerRef}
          position="absolute"
          inset={0}
          pointerEvents="none"
        />

        {/* フィルムノイズ */}
        <Box
          position="absolute"
          inset={0}
          zIndex="backgroundNoise"
          opacity={0.02}
          pointerEvents="none"
          backgroundImage="url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3e%3cfilter id='noiseFilter'%3e%3cfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3e%3c/filter%3e%3crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3e%3c/svg%3e&quot;)"
        />
      </Box>
    </>
  );
};
