export const SECTION_IDS = {
  introduction: "introduction",
  characters: "characters",
  performance: "performance",
  reservation: "reservation",
} as const;

type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const HEADER_HEIGHT = "60px";

export const RESERVATION_DATE_TIME = [
  { value: "2026-07-18-day", label: "2026/7/18(土) 昼" },
  { value: "2026-07-18-night", label: "2026/7/18(土) 夜" },
  { value: "2026-07-19-day", label: "2026/7/19(日) 昼" },
  { value: "2026-07-19-night", label: "2026/7/19(日) 夜" },
];

export const HORIZONTAL = [
  { value: "X", label: "X" },
  { value: "Instagram", label: "Instagram" },
  { value: "web", label: "本webページ" },
  { value: "flyer", label: "フライヤー" },
  { value: "contact", label: "関係者" },
  { value: "other", label: "その他" }, // 3行くらいで表示+行数増やせるようにしておく
];

export const MENU_ITEMS = [
  { id: SECTION_IDS.introduction, label: "あらすじ" },
  { id: SECTION_IDS.characters, label: "登場人物" },
  { id: SECTION_IDS.performance, label: "公演情報" },
  { id: SECTION_IDS.reservation, label: "予約" },
];

export const MENU_MAP: Record<SectionId, string> = Object.fromEntries(
  MENU_ITEMS.map((item) => [item.id, item.label]),
) as Record<SectionId, string>;
