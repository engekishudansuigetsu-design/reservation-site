import { z } from "zod";

/** 予約開始日時: TODO 動作確認とれたら差し替える */
export const START_REGISTRATION_UTC = "2026-05-30T04:00:00.000Z";
// export const START_REGISTRATION_UTC = "2026-06-17T04:00:00.000Z";

/**
 * 公演日時マスターデータ
 * - 公演日時(UTC)
 * - 各回キャパ
 * - 予約締め切り(UTC)
 */
export const RESERVATION_MASTER_SCHEDULE = [
  {
    reserveId: "2026-07-18T04:00:00.000Z",
    label: "2026年7月18日 13時開演の回",
    capacity: 25,
    closeAt: "2026-07-18T04:59:59.999Z",
  },
  {
    reserveId: "2026-07-18T08:00:00.000Z",
    label: "2026年7月18日 17時開演の回",
    capacity: 25,
    closeAt: "2026-07-18T08:59:59.999Z",
  },
  {
    reserveId: "2026-07-19T03:00:00.000Z",
    label: "2026年7月19日 12時開演の回",

    capacity: 25,
    closeAt: "2026-07-19T03:59:59.999Z",
  },
  {
    reserveId: "2026-07-19T07:00:00.000Z",
    label: "2026年7月20日 16時開演の回",
    capacity: 25,
    closeAt: "2026-07-19T07:59:59.999Z",
  },
] as const;

/** 予約情報 */
export const reservationSchema = z.object({
  name: z.string().min(1).max(10), // 予約者名
  email: z.email(), // 予約者メール
  reserveId: z.enum(RESERVATION_MASTER_SCHEDULE.map((v) => v.reserveId)), // 観劇日時
  count: z.number().min(1).max(10), // 予約人数
  findFrom: z.array(z.string()), // どこから予約したか
  note: z.string().max(140).optional(), // 備考
  age: z.string(),
});

export type ReservationRequest = z.infer<typeof reservationSchema>;
