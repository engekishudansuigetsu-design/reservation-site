export const SECTION_IDS = {
  top: "top",
  introduction: "introduction",
  characters: "characters",
  performance: "performance",
  reservation: "reservation",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const HEADER_HEIGHT = "60px";

export const FIND_FROM_ITEMS = [
  { value: "X", label: "X" },
  { value: "Instagram", label: "Instagram" },
  { value: "本webページ", label: "本webページ" },
  { value: "フライヤー", label: "フライヤー" },
  { value: "関係者", label: "関係者" },
  { value: "その他", label: "その他" }, // 3行くらいで表示+行数増やせるようにしておく
];

export const MENU_ITEMS = [
  { id: SECTION_IDS.top, label: "トップ" },
  { id: SECTION_IDS.introduction, label: "あらすじ" },
  { id: SECTION_IDS.characters, label: "登場人物" },
  { id: SECTION_IDS.performance, label: "公演情報" },
  { id: SECTION_IDS.reservation, label: "予約" },
];

export const MENU_MAP: Record<SectionId, string> = Object.fromEntries(
  MENU_ITEMS.map((item) => [item.id, item.label]),
) as Record<SectionId, string>;

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export const STAFF_CREDITS = [
  {
    role: "主宰・脚本・演出・舞台監督",
    names: [{ name: "朱居智光", team: "演劇集団すいげつ" }],
  },
  {
    role: "演出助手・舞台監督",
    names: [{ name: "難波瑞穂", team: "演劇集団すいげつ" }],
  },
  {
    role: "制作",
    names: ["はらゆう"],
  },
  {
    role: "照明",
    names: ["金原明大"],
  },
  {
    role: "音響",
    names: ["三屋平舜矢"],
  },
  {
    role: "音響操作",
    names: ["いけだ"],
  },
  {
    role: "ドレス制作",
    names: ["石川桜子"],
  },
  {
    role: "宣伝美術",
    names: ["つきみさん"],
  },
  {
    role: "宣伝美術補佐",
    names: ["三屋平舜矢"],
  },
  {
    role: "当日制作",
    names: ["呆れ霹靂"],
  },
];
