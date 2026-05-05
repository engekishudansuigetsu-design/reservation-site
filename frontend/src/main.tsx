import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

async function enableMocking() {
  // 開発環境かつ、環境変数などでモックを有効にしたい場合のみ実行
  if (!import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCK !== "true") {
    return;
  }

  // Orvalが生成したmswのhandlersをインポート
  // パスはOrvalのoutput設定に合わせて調整してください
  const { getDefaultMock } =
    await import("frontend/src/lib/gas/default/default.msw.ts");
  const { setupWorker } = await import("msw/browser");

  const worker = setupWorker(...getDefaultMock());
  return worker.start();
}

const queryClient = new QueryClient();

enableMocking().then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </StrictMode>,
  ),
);
