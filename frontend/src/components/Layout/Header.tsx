import { Flex, IconButton, Menu, Portal } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { SECTION_IDS, HEADER_HEIGHT, MENU_ITEMS } from "../../const";

export const Header = () => {
  const handleClick = (id: (typeof MENU_ITEMS)[number]["id"]) => {
    const target = document.getElementById(id);

    // もしtargetが見つからない場合は、ページのトップにスクロールする
    if (!target) return;

    // トップセクションの場合は、ページのトップにスクロールする
    // それ以外のセクションの場合は、該当のセクションにスクロールする
    target.scrollIntoView({
      behavior: "smooth",
      ...(id === SECTION_IDS.top ? { top: 0 } : { block: "start" }),
    });
  };

  return (
    <Flex
      w="100%"
      h={HEADER_HEIGHT}
      px={4}
      position="sticky"
      top={0}
      zIndex={100}
      bg="#B00000"
      align="center"
      justify="flex-end"
    >
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton aria-label="menu" variant="ghost" color="white">
            <RxHamburgerMenu />
          </IconButton>
        </Menu.Trigger>

        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {MENU_ITEMS.map((item) => (
                <Menu.Item
                  key={item.id}
                  value={item.id}
                  onClick={() => handleClick(item.id)}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
};
