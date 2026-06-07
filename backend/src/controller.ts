/** ビジネスロジック */

import {
  RESERVATION_MASTER_SCHEDULE,
  ReservationRequest,
  START_REGISTRATION_UTC,
} from "@shared/domain-model";
import { getReserVationsData, postReservationData } from "./repository";
import { createReservationStatus } from "./utils";
import {
  MaxReserveError,
  RegistrationClosedError,
  RegistrationNotStartedError,
} from "./ApiError";

export type ReserveStatus = {
  reserveId: ReservationRequest["reserveId"];
  remainCount: number;
};

/**
 * sheetの予約状況からのこりの予約数を返却します
 * @returns 予約状況のカウント結果
 */
export function handleGetReservations(): ReserveStatus[] {
  const data = getReserVationsData();

  return createReservationStatus(data);
}

/**
 * sheetに予約情報を追加します
 */
export function handlePostReservation(param: ReservationRequest) {
  const lock = LockService.getScriptLock();

  // 排他処理のため最大10秒待つ
  lock.waitLock(10000);

  try {
    // 日時チェック
    const now = new Date();
    // 予約開始後か
    if (now < new Date(START_REGISTRATION_UTC)) {
      console.warn(JSON.stringify(param));
      throw new RegistrationNotStartedError();
    }

    // 予約終了している
    const schedule = RESERVATION_MASTER_SCHEDULE.find(
      (v) => v.reserveId === param.reserveId,
    );
    if (schedule === undefined || now > new Date(schedule.closeAt)) {
      console.warn(JSON.stringify(param));
      throw new RegistrationClosedError();
    }

    // 予約数チェック
    const data = getReserVationsData();
    const reservationStatus = createReservationStatus(data).find(
      (v) => v.reserveId === param.reserveId,
    );
    if (
      reservationStatus === undefined ||
      reservationStatus.remainCount === 0 ||
      reservationStatus.remainCount < param.count
    ) {
      console.warn(JSON.stringify(param));
      throw new MaxReserveError();
    }

    // 予約実行
    postReservationData(param);

    // 予約完了メールを送信
    MailApp.sendEmail({
      to: param.email,
      subject: "予約完了のお知らせ",
      body: `
予約を受け付けました。

■予約内容
予約日時: ${schedule.label}
予約名: ${param.name}
人数: ${param.count}

ご予約のキャンセル、変更のある場合は当メールまでご連絡ください。
ご来場をお待ちしております。
`,
    });
  } finally {
    lock.releaseLock();
  }
}
