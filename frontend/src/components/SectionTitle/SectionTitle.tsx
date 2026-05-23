import {
  HEADER_HEIGHT,
  MENU_MAP,
  SECTION_IDS,
  type SectionId,
} from "../../const";
import { HStack, Text } from "@chakra-ui/react";
import { TitleAccent } from "./titleAccent";

type Props = {
  id: SectionId;
};

export const SectionTitle = ({ id }: Props) => (
  <HStack gap={5} px={4} py={20}>
    <TitleAccent />
    <Text
      as="h2"
      fontSize="xl"
      scrollMarginTop={HEADER_HEIGHT}
      id={SECTION_IDS[id]}
      display="block"
      minW="fit-content"
    >
      {MENU_MAP[id]}
    </Text>
    <TitleAccent />
  </HStack>
);
