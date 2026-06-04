import { Box } from "@chakra-ui/react";
import { useRef, useEffect } from "react";

// 内部データ用のシンプルなオブジェクト型（クラスより軽量）
interface FireflyData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  alphaStep: number;
  size: number;
}

export const Orbs = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // 💡 スマホの画面サイズに合わせて、個数を「20個」に間引いて軽量化
    const fireflyCount = 20;
    const fireflies: FireflyData[] = [];

    // 画面サイズのセット
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // 蛍の初期化
    const createFirefly = (): FireflyData => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * Math.PI * 2,
      // 瞬きの速度
      alphaStep: Math.random() * 0.012 + 0.005,
      // サイズもスマホ用に少し小さく調整（1px〜2px）
      size: Math.random() * 2 + 1.5,
    });

    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push(createFirefly());
    }

    // アニメーションループ
    const animate = () => {
      // 画面全体を一度クリア
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fireflies.forEach((f) => {
        // 位置の更新（わずかなランダムノイズを付与）
        f.vx += (Math.random() - 0.5) * 0.004;
        f.vy += (Math.random() - 0.5) * 0.004;
        f.x += f.vx;
        f.y += f.vy;

        // 画面外に出たときのループ処理
        const margin = 20;
        if (f.x < -margin) f.x = canvas.width + margin;
        if (f.x > canvas.width + margin) f.x = -margin;
        if (f.y < -margin) f.y = canvas.height + margin;
        if (f.y > canvas.height + margin) f.y = -margin;

        // 瞬き（サイン波の4乗）
        f.alpha += f.alphaStep;
        const opacity = Math.pow(Math.max(0, Math.sin(f.alpha) * 0.5 + 0.5), 4);

        if (opacity > 0.01) {
          // 💡 CSSのblurやbox-shadowを使わず、Canvasの円形グラデーションで「光のぼかし」を超軽量に表現
          const gradient = ctx.createRadialGradient(
            f.x,
            f.y,
            0,
            f.x,
            f.y,
            f.size * 2,
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
          gradient.addColorStop(0.4, `rgba(255, 255, 255, ${opacity * 0.6})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resizeCanvas();
      // 画面サイズが変わったらはみ出た蛍を再配置
      fireflies.forEach((f) => {
        if (f.x > canvas.width) f.x = Math.random() * canvas.width;
        if (f.y > canvas.height) f.y = Math.random() * canvas.height;
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      inset={0}
      backgroundColor="transparent"
      position="fixed"
      overflow="hidden"
      zIndex="backgroundBaseWrapper"
      pointerEvents="none"
    >
      {/* 💡 30個のdivを廃止し、1枚のCanvasに集約 */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />

      {/* フィルムノイズ（重い場合はさらにopacityを下げるか削除を検討） */}
      <Box
        position="absolute"
        inset={0}
        zIndex="backgroundNoise"
        opacity={0.015} // スマホ向けに少し薄くしてノイズによる負荷も軽減
        backgroundImage="url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3e%3cfilter id='noiseFilter'%3e%3cfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3e%3c/filter%3e%3crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3e%3c/svg%3e&quot;)"
      />
    </Box>
  );
};
