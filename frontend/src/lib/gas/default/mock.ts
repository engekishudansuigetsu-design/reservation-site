import {
  getGetReserveMockHandler,
  getPostReserveMockHandler,
} from "./default.msw";

export const gasMocks = () => [
  getGetReserveMockHandler([
    {
      reserveId: "2026-07-19T13:30:00+09:00",
      label: "07/19 13:30",
      remainCount: 25,
    },
    {
      reserveId: "2026-07-19T19:00:00+09:00",
      label: "07/19 19:00",
      remainCount: 3,
    },
    {
      reserveId: "2026-07-20T13:30:00+09:00",
      label: "07/20 13:30",
      remainCount: 5,
    },
    {
      reserveId: "2026-07-20T19:00:00+09:00",
      label: "07/20 19:00",
      remainCount: 0,
    },
  ]),
  getPostReserveMockHandler(),
];
