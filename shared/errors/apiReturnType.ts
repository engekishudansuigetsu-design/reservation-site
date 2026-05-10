import type { ErrorCode } from "./errorCodes";

export type ApiSuccessResponse<T> = {
  result: true;
  data: T;
};

export type ApiErrorResponse = {
  result: false;
  code: ErrorCode;
  message: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
