import { ERROR_CODES, ErrorCode } from "@shared/errors";

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
  ) {
    super(message);

    this.name = "AppError";

    // prototype chain修正
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class InvalidParameterError extends AppError {
  constructor(message = "入力値が不正です。入力内容をご確認ください。") {
    super(ERROR_CODES.INVALID_PARAMETER, message);

    this.name = "InvalidParameterError";

    Object.setPrototypeOf(this, InvalidParameterError.prototype);
  }
}

export class RegistrationNotStartedError extends AppError {
  constructor() {
    super(ERROR_CODES.REGISTRATION_NOT_STARTED, "予約受付開始前です。");

    this.name = "RegistrationNotStartedError";

    Object.setPrototypeOf(this, RegistrationNotStartedError.prototype);
  }
}

export class RegistrationClosedError extends AppError {
  constructor() {
    super(
      ERROR_CODES.REGISTRATION_CLOSED,
      "この回の予約受付は終了しています。",
    );

    this.name = "RegistrationClosedError";

    Object.setPrototypeOf(this, RegistrationClosedError.prototype);
  }
}

export class MaxReserveError extends AppError {
  constructor() {
    super(
      ERROR_CODES.MAX_RESERVE,
      "予約可能数を超えています。別の回をご予約ください。",
    );

    this.name = "MaxReserveError";

    Object.setPrototypeOf(this, MaxReserveError.prototype);
  }
}
