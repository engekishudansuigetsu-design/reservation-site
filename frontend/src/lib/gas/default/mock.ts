import { getGetExecMockHandler, getPostExecMockHandler } from "./default.msw";

export const gasMocks = () => [
  getGetExecMockHandler([
    {
      reserveId: "2026-07-18T04:00:00.000Z",
      label: "07/19 13:00",
      remainCount: 25,
    },
    {
      reserveId: "2026-07-18T08:00:00.000Z",
      label: "07/19 19:00",
      remainCount: 3,
    },
    {
      reserveId: "2026-07-19T03:00:00.000Z",
      label: "07/20 13:00",
      remainCount: 5,
    },
    {
      reserveId: "2026-07-19T07:00:00.000Z",
      label: "07/20 19:00",
      remainCount: 0,
    },
  ]),

  getPostExecMockHandler(),
];
