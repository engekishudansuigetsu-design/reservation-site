import {
  Box,
  Flex,
  IconButton,
  Image,
  Menu,
  Portal,
  Spacer,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import suigetsuIcon from "../../assets/icon-white.svg";
import { HEADER_HEIGHT, MENU_ITEMS } from "../../const";
import { jumpToSection } from "./utils";

export const Header = () => (
  <Flex
    h={HEADER_HEIGHT}
    px={4}
    position="sticky"
    top={0}
    zIndex={100}
    bg="brand.500"
    align="center"
    borderBottom="3px solid rgb(110, 1, 1)"
    boxShadow="0 0 10px 5px rgb(110, 1, 1)"
  >
    <Box
      as="button"
      onClick={() => jumpToSection("top")}
      boxSize={10}
      cursor="pointer"
    >
      <Image src={suigetsuIcon} boxSize={10} alt="icon" />
    </Box>

    <Spacer />

    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton aria-label="menu" colorPalette="brand">
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
                onClick={() => jumpToSection(item.id)}
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
