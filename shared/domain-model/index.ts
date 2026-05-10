import { z } from "zod";

/** 予約開始日時 */
export const START_REGISTRATION_UTC = "2026-06-17T04:00:00.000Z";

/**
 * 公演日時マスターデータ
 * - 公演日時(UTC)
 * - 各回キャパ
 * - 予約締め切り(UTC)
 */
export const RESERVATION_MASTER_SCHEDULE = [
  {
    reserveId: "2026-07-19T04:00:00.000Z",
    label: "2026年7月19日 昼の回",
    capacity: 25,
    closeAt: "2026-07-18T14:59:59.999Z",
  },
  {
    reserveId: "2026-07-19T10:00:00.000Z",
    label: "2026年7月19日 夜の回",
    capacity: 25,
    closeAt: "2026-07-18T14:59:59.999Z",
  },
  {
    reserveId: "2026-07-20T04:00:00.000Z",
    label: "2026年7月20日 昼の回",

    capacity: 25,
    closeAt: "2026-07-19T14:59:59.999Z",
  },
  {
    reserveId: "2026-07-20T10:00:00.000Z",
    label: "2026年7月20日 夜の回",
    capacity: 25,
    closeAt: "2026-07-19T14:59:59.999Z",
  },
] as const;

/** 予約情報 */
export const reservationSchema = z.object({
  name: z.string().min(1), // 予約者名
  email: z.string().email(), // 予約者メール
  reserveId: z.enum(RESERVATION_MASTER_SCHEDULE.map((v) => v.reserveId)), // 観劇日時
  count: z.number().min(1), // 予約人数
  findFrom: z.array(z.string()), // どこから予約したか
  note: z.string().optional(), // 備考
});

export type ReservationRequest = z.infer<typeof reservationSchema>;
