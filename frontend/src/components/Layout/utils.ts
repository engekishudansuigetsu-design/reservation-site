import { SECTION_IDS, type MENU_ITEMS } from "../../const";

export const jumpToSection = (id: (typeof MENU_ITEMS)[number]["id"]) => {
  if (id === SECTION_IDS.top) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }

  const target = document.getElementById(id);

  // もしtargetが見つからない場合は、ページのトップにスクロールする
  if (!target) return;

  // トップセクションの場合は、ページのトップにスクロールする
  // それ以外のセクションの場合は、該当のセクションにスクロールする
  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
