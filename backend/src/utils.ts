/** 各API共通で使う便利関数 */

import {
  RESERVATION_MASTER_SCHEDULE,
  ReservationRequest,
} from "@shared/domain-model";
import { ReserveStatus } from "./controller";
import { ReservationRequestSheet } from "./repository";

/**
 * 予約管理のspread sheet を取得します
 * @returns spread sheet
 */
export const getSpreadsheet = () => {
  const id =
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!id) throw new Error("SPREADSHEET_ID is not set in script properties");

  const sheet = SpreadsheetApp.openById(id).getSheetByName("reservations");
  if (!sheet) throw new Error("sheet was not found");
  return sheet;
};

/**
 * spread sheetから予約可能残数を集計します
 * 予約日時ごとに集計
 * 予約可能日時すぎていたら0
 * @param data spread sheet datas
 * @returns 予約可能残数
 */
export const createReservationStatus = (
  data: ReservationRequestSheet[],
): ReserveStatus[] => {
  const now = new Date();

  const countMap = data.reduce<Record<string, number>>((prev, cur) => {
    prev[cur.reserveId] = (prev[cur.reserveId] ?? 0) + cur.count;

    return prev;
  }, {});

  return RESERVATION_MASTER_SCHEDULE.map((reservation) => {
    const remainCount =
      reservation.capacity - (countMap[reservation.reserveId] ?? 0);

    const isClosed = now > new Date(reservation.closeAt);

    return {
      reserveId: reservation.reserveId,
      remainCount: isClosed || remainCount < 0 ? 0 : remainCount,
    };
  });
};
