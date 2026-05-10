/** APIからのエラーコードまとめ */

export const ERROR_CODES = {
  /** 予約可能数超過 */
  MAX_RESERVE: "MAX_RESERVE",
  /** 申し込み情報不備 */
  INVALID_PARAMETER: "INVALID_PARAMETER",
  /** 予約締め切り済み */
  REGISTRATION_CLOSED: "REGISTRATION_CLOSED",
  /** 予約開始前 */
  REGISTRATION_NOT_STARTED: "REGISTRATION_NOT_STARTED",
  /** そのた原因不明 */
  UNKNOWN: "UNKNOWN",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
