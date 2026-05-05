import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(1), // 予約者名
  email: z.string().email(), // 予約者メール
  reserveId: z.string(), // 観劇日時
  count: z.number().min(1), // 予約人数
  findFrom: z.array(z.string()), // どこから予約したか
  note: z.string().optional(), // 備考
});

export type ReservationRequest = z.infer<typeof reservationSchema>;
