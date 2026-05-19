import { createListCollection } from "@chakra-ui/react";

export const SECTION_IDS = {
  introduction: "introduction",
  characters: "characters",
  performance: "performance",
  reservation: "reservation",
} as const;

type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

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
