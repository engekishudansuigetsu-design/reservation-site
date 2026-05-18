export const formatReservationIdLabel = (data: string) => {
  const dateReservationId = new Date(data);

  // 各パーツの取得
  const m = dateReservationId.getMonth() + 1; // 月
  const d = dateReservationId.getDate(); // 日
  const w = ["日", "月", "火", "水", "木", "金", "土"][
    dateReservationId.getDay()
  ];
  // [dateReservationId.getDay()]; // 曜日

  const hh = String(dateReservationId.getHours()).padStart(2, "0");
  const mm = String(dateReservationId.getMinutes()).padStart(2, "0");

  const formatted = `${m}/${d}日 (${w}) ${hh}:${mm}の回`;
  return formatted;
};
