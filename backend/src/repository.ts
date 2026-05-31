/** データアクセス */

import {
  RESERVATION_MASTER_SCHEDULE,
  ReservationRequest,
} from "@shared/domain-model";
import { getSpreadsheet } from "./utils";

export type ReservationRequestSheet = Omit<ReservationRequest, "age">;

/**
 * Sheetの行を予約情報に変換して返却
 * @returns
 */
export function getReserVationsData(): ReservationRequestSheet[] {
  const sheet = getSpreadsheet();
  const data = sheet.getDataRange().getValues();
  // 予約0でヘッダーだけ
  if (data.length <= 1) {
    return [];
  }
  // ヘッダを除去
  data.shift();
  Logger.log("data,", JSON.stringify(data));

  return data
    .map((row) => {
      const reserveId = RESERVATION_MASTER_SCHEDULE.find(
        (v) => v.label === row[3],
      );

      return reserveId
        ? ({
            name: row[1],
            email: row[2],
            reserveId: RESERVATION_MASTER_SCHEDULE.find(
              (v) => v.label === row[3],
            )!.reserveId as ReservationRequest["reserveId"],
            count: Number(row[4]),
            findFrom: String(row[5]).split(", "),
            note: row[6],
          } satisfies ReservationRequestSheet)
        : undefined;
    })
    .filter((v) => v !== undefined);
}

/** Sheetに予約情報をかきこみ */
export function postReservationData(param: ReservationRequest) {
  const sheet = getSpreadsheet();
  // sheetにかきこみ
  sheet.appendRow([
    Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss"),
    param.name,
    param.email,
    RESERVATION_MASTER_SCHEDULE.find((v) => v.reserveId === param.reserveId)!
      .label,
    param.count,
    param.findFrom.join(", "),
    param.note ?? "",
    "booked",
  ]);
}
