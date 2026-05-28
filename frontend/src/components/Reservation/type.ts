import { z } from "zod";

import { reservationSchema } from "@repo/shared/domain-model";
import { RESERVATION_MASTER_SCHEDULE } from "@repo/shared/domain-model";
const reserveIds: string[] = RESERVATION_MASTER_SCHEDULE.map(
  (v) => v.reserveId,
);

const ERROR_MESSAGES = {
  nameRequired: "お名前を入力してください",
  nameMax: "10文字以内で入力してください",
  emailRequired: "有効なメールアドレスを入力してください",
  reserveIdRequired: "観劇日時を選択してください",
  countRequired: "予約人数を選択してください",
  findFromRequired: "1つ以上選択してください",
  findFromOtherRequired: "その他を選択した場合は、詳細を入力してください",
  findFromWhoRequired: "関係者を選択した場合は、関係者名を入力してください",
  noteMax: "140文字以内で入力してください",
} as const;

export const reservationSchemaFront = reservationSchema.extend({
  name: z
    .string()
    .min(1, ERROR_MESSAGES.nameRequired)
    .max(10, ERROR_MESSAGES.nameMax),

  email: z.email(ERROR_MESSAGES.emailRequired),

  reserveId: z
    .string()
    .min(1, ERROR_MESSAGES.reserveIdRequired)
    .refine((value) => reserveIds.includes(value), {
      message: ERROR_MESSAGES.reserveIdRequired,
    }),

  count: z.number().min(1, ERROR_MESSAGES.countRequired),

  findFrom: z.array(z.string()).min(1, ERROR_MESSAGES.findFromRequired),

  findFromOther: z.string().optional(), //どこから予約したかのその他項目
  findFromWho: z.string().optional(), //どこから予約したのかの人の項目
  note: z.string().max(140, ERROR_MESSAGES.noteMax).optional(),
  age: z.string(),
});

export type ReservationRequestFront = z.infer<typeof reservationSchemaFront>;
