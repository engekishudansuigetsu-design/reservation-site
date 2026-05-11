import { z } from "zod";

import { reservationSchema } from "@repo/shared/domain-model";

export const reservationSchemaFront = reservationSchema.extend({
  findFromOther: z.string().optional(), //どこから予約したかのその他項目
  findFromWho: z.string().optional(), //どこから予約したのかの人の項目
});

export type ReservationRequestFront = z.infer<typeof reservationSchemaFront>;
