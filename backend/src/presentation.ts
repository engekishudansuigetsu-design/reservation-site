/** APIのエントリーポイント */

import { reservationSchema } from "@shared/domain-model";
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
  // 取得はたくさん呼ばれるのでアクセス頻度とかみなくていい？
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
    if (body.data?.age !== undefined && body.data?.age.length > 0) {
      console.warn(
        `[Spam Blocked]: Bot attempted to submit form. Input: "${body.data?.age}"`,
      );
      return createJsonResponse({ result: true, data: null });
    }
    if (!body.success) {
      throw new InvalidParameterError();
    }
    handlePostReservation(body.data);
    return createJsonResponse({ result: true, data: null });
  } catch (e) {
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
