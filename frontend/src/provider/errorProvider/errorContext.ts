import { createContext } from "react";

/**
 * グローバルエラーダイアログを表示するためのContext型
 */
export type ErrorContextType = {
  /**
   * エラーダイアログを表示する
   *
   * @param message ダイアログに表示するエラーメッセージ
   */
  showError: (message: string) => void;
};

/**
 * グローバルエラー表示用Context
 */
export const ErrorContext = createContext<ErrorContextType | null>(null);
