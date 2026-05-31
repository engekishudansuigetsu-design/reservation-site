import { getGetExecMockHandler, getPostExecMockHandler } from "./default.msw";

export const gasMocks = () => [
  getGetExecMockHandler([
    {
      reserveId: "2026-07-18T04:00:00.000Z",
      remainCount: 25,
    },
    {
      reserveId: "2026-07-18T08:00:00.000Z",
      remainCount: 3,
    },
    {
      reserveId: "2026-07-19T03:00:00.000Z",
      remainCount: 5,
    },
    {
      reserveId: "2026-07-19T07:00:00.000Z",
      remainCount: 0,
    },
  ]),

  getPostExecMockHandler(),
];
