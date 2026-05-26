import type { ApiErrorResponse } from "@repo/shared/errors";

/** 引数のerrorがBEで定義されたエラーレスポンスかどうか判定します */
export const isApiErrorResponse = (
  error: unknown,
): error is ApiErrorResponse => {
  return (
    typeof error === "object" &&
    error !== null &&
    "result" in error &&
    "code" in error &&
    "message" in error
  );
};
