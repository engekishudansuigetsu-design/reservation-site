import { useContext } from "react";
import { ErrorContext } from "./errorContext";

/**
 * グローバルエラーダイアログを操作するHook
 *
 * ErrorProvider 配下でのみ利用可能。
 *
 * @throws Error ErrorProvider 配下で利用されていない場合
 */
export const useGlobalError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useGlobalError must be used within ErrorProvider");
  }

  return context;
};
