import { Box, Flex, IconButton, Menu, Portal } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { SECTION_IDS } from "../../const.tsx";

const menuItems = [
  { id: SECTION_IDS.introduction, label: "あらすじ" },
  { id: SECTION_IDS.characters, label: "登場人物" },
  { id: SECTION_IDS.performance, label: "公演情報" },
  { id: SECTION_IDS.reservation, label: "予約" },
];

export const Header = () => {
  const handleClick = (id: string) => {
    const target = document.getElementById(id);

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Box position="sticky" top={0} zIndex={100} bg="#B00000" w="100%">
      <Flex maxW="container.lg" mx="auto" px={4} h="60px" align="center" justify="flex-end">
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton aria-label="menu" variant="ghost" color="white">
              <RxHamburgerMenu />
            </IconButton>
          </Menu.Trigger>

          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {menuItems.map((item) => (
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
    </Box>
  );
};