// src/constants/sectionIds.ts
export const SECTION_IDS = {
	introduction: "introduction",
	characters: "characters",
	performance: "performance",
	reservation: "reservation",
} as const;

export const headerHeight = "60px";

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