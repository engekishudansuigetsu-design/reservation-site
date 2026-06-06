/** APIのエントリーポイント */

import { fieldNameMap, reservationSchema } from "@shared/domain-model";
import { handleGetReservations, handlePostReservation } from "./controller";
import { AppError, InvalidParameterError } from "./ApiError";
import { ApiErrorResponse, ApiResponse } from "@shared/errors/apiReturnType";

/**
 * レスポンスデータを作成します
 * @param data
 * @returns
 */
const createJsonResponse = <T>(data: ApiResponse<T>) => {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
};

/**
 * spreadsheetの予約状況を取得します
 * GAS側でこの名前で固定です
 */
export function doGet() {
  return createJsonResponse({ result: true, data: handleGetReservations() });
}

/**
 * 予約を登録します
 * GAS側でこの名前で固定です
 * @param ReserveInput 予約情報
 * @throws RegistrationNotStartedError 予約受付開始前エラー
 * @throws RegistrationClosedError 予約受付終了後エラー
 * @throws InvalidParameterError 入力値不正エラー
 * @throws MaxReserveError 予約可能数超過エラー
 */
export function doPost(e: GoogleAppsScript.Events.DoPost) {
  try {
    const body = reservationSchema.safeParse(JSON.parse(e.postData.contents));
    if (body.data?.age !== undefined && body.data?.age !== "") {
      console.warn(
        `[Spam Blocked]: Bot attempted to submit form. Input: "${body.data?.age}"`,
      );
      return createJsonResponse({ result: true, data: null });
    }
    if (!body.success) {
      const detail = body.error.issues
        .map((issue) => {
          const field = issue.path[0]?.toString() ?? "不明な項目";
          const fieldName =
            fieldNameMap[field as keyof typeof fieldNameMap] ?? field;

          return `・${fieldName}: ${issue.message}`;
        })
        .join("\n");

      throw new InvalidParameterError(`入力値が不正です。\n\n${detail}`);
    }
    const hasUrl = /(https?:\/\/|www\.)/i.test(body.data.note ?? "");

    if (hasUrl) {
      console.warn(JSON.stringify(body.data));
      throw new InvalidParameterError();
    }
    const safeName = sanitizeMailText(body.data.name);
    const bannedWords = ["casino", "viagra", "bitcoin", "http"];

    if (
      bannedWords.some((w) => (body.data.note ?? "").toLowerCase().includes(w))
    ) {
      console.warn(JSON.stringify(body.data));
      throw new InvalidParameterError();
    }
    handlePostReservation({ ...body.data, name: safeName });
    return createJsonResponse({ result: true, data: null });
  } catch (e) {
    console.warn(JSON.stringify(e));
    if (e instanceof AppError) {
      const response: ApiErrorResponse = {
        result: false,
        code: e.code,
        message: e.message,
      };

      return createJsonResponse(response);
    }

    const response: ApiErrorResponse = {
      result: false,
      code: "UNKNOWN",
      message: e instanceof Error ? e.message : "unknown error",
    };

    return createJsonResponse(response);
  }
}

const sanitizeMailText = (text: string) => {
  return text
    .replace(/[\r\n]/g, " ")
    .replace(/[<>]/g, "")
    .trim();
};
