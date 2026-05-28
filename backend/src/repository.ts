/** データアクセス */

import { ReservationRequest } from "@shared/domain-model";
import { getSpreadsheet } from "./utils";

export type ReservationRequestSheet = Omit<ReservationRequest, "age">;

/**
 * Sheetの行を予約情報に変換して返却
 * @returns
 */
export function getReserVationsData(): ReservationRequestSheet[] {
  const sheet = getSpreadsheet();
  const data = sheet.getDataRange().getValues();

  return data.map(
    (row) =>
      ({
        name: row[1],
        email: row[2],
        reserveId: row[3] as ReservationRequest["reserveId"],
        count: Number(row[4]),
        findFrom: String(row[5]).split(", "),
        note: row[6],
      }) satisfies ReservationRequestSheet,
  );
}

/** Sheetに予約情報をかきこみ */
export function postReservationData(param: ReservationRequest) {
  const sheet = getSpreadsheet();
  // sheetにかきこみ
  sheet.appendRow([
    Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss"),
    param.name,
    param.email,
    param.reserveId,
    param.count,
    param.findFrom.join(", "),
    param.note ?? "",
    "booked",
  ]);
}
