import "../index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./lib/chakra-ui/theme.ts";

async function enableMocking() {
  // 開発環境かつ、環境変数などでモックを有効にしたい場合のみ実行
  if (!import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCK !== "true") {
    return;
  }

  // Orvalが生成したmswのhandlersをインポート
  // パスはOrvalのoutput設定に合わせて調整してください
  const { gasMocks } = await import("frontend/src/lib/gas/default/mock.ts");
  const { setupWorker } = await import("msw/browser");

  const worker = setupWorker(...gasMocks());
  return worker.start();
}

const queryClient = new QueryClient();

enableMocking().then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={system}>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </StrictMode>,
  ),
);
