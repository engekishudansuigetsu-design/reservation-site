import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(1, "予約者名を入力してください"), // 予約者名
  email: z.string().email("有効なメールアドレスを入力してください"), // 予約者メール
  reserveId: z.string().min(1, "観劇日時を入力してください"), // 観劇日時
  count: z.number().min(1, "予約人数を選択してください"), // 予約人数
  findFrom: z.array(z.string().min(1, "1つ以上選択してください")), // どこから予約したか
  note: z.string().optional(), // 備考
});

export type ReservationRequest = z.infer<typeof reservationSchema>;
