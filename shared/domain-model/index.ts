import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(1), // 予約者名
  email: z.string().email(), // 予約者メール
  phone: z.string(), // 予約者電話番号
  slotId: z.string(), // 観劇日時
  findFrom: z.enum(["X", "Instagram", "Web", "Other"]), // どこから予約したか
});

export type ReservationRequest = z.infer<typeof reservationSchema>;
