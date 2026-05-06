// src/constants/sectionIds.ts
export const SECTION_IDS = {
	introduction: "introduction",
	characters: "characters",
	performance: "performance",
	reservation: "reservation",
} as const;

export const HEADERHEIGHT = "60px";

export const MENUITEMS = [
	{ id: SECTION_IDS.introduction, label: "あらすじ" },
	{ id: SECTION_IDS.characters, label: "登場人物" },
	{ id: SECTION_IDS.performance, label: "公演情報" },
	{ id: SECTION_IDS.reservation, label: "予約" },
];
