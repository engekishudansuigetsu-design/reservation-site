import { Button, Dialog, Portal, Text } from "@chakra-ui/react";

import { useState } from "react";
import { ErrorContext } from "./errorContext";

const dialogStyle = {
  width: {
    base: "calc(100vw - 32px)",
    sm: "sm",
    md: "md",
  },
  maxW: "600px",
  maxH: "calc(100vh - 32px)",
  overflow: "auto",
  borderRadius: {
    base: "xl",
    md: "2xl",
  },
  color: "#140a00",
} as const;

/**
 * ErrorProvider のProps
 */
type ErrorProviderProps = {
  children: React.ReactNode;
};

/**
 * アプリ全体で利用するグローバルエラーダイアログProvider
 *
 * showError(message) を呼び出すことで、
 * 共通エラーダイアログを表示できる。
 */
export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [message, setMessage] = useState<string>();

  /**
   * ダイアログを閉じる
   */
  const closeDialog = () => {
    setMessage(undefined);
  };

  return (
    <ErrorContext.Provider
      value={{
        showError: setMessage,
      }}
    >
      {children}

      <Dialog.Root
        open={!!message}
        onOpenChange={closeDialog}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop />

          <Dialog.Positioner>
            <Dialog.Content {...dialogStyle}>
              <Dialog.Header>
                <Dialog.Title color="#140a00">エラー</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Text whiteSpace="pre-wrap" color="#140a00">
                  {message}
                </Text>
              </Dialog.Body>

              <Dialog.Footer>
                <Button colorPalette="brand" onClick={closeDialog}>
                  閉じる
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </ErrorContext.Provider>
  );
};
