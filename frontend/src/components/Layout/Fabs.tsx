import { Button, IconButton, Image, VStack } from "@chakra-ui/react";
import { jumpToSection } from "./utils";
import { SECTION_IDS } from "../../const";
import xIcon from "../../assets/Xlogo.svg";
import instaIcon from "../../assets/Instagram_Glyph_White.svg";
import suigetsuIcon from "../../assets/icon-white.svg";

const onOpenSNS = (url: string) => {
  window.open(`${url}`, "_blank", "noopener,noreferrer");
};

export const Fabs = () => (
  <VStack alignItems="flex-end" gap={5}>
    <IconButton
      colorPalette="brand"
      rounded="full"
      aria-label="公式Xを開く"
      onClick={() => {
        onOpenSNS("https://x.com/suigetsu_engeki");
      }}
    >
      <Image src={xIcon} boxSize={5} />
    </IconButton>
    <IconButton
      colorPalette="brand"
      rounded="full"
      aria-label="公式Instagramを開く"
      onClick={() => {
        onOpenSNS("https://www.instagram.com/engekishudan.suigetsu/");
      }}
    >
      <Image src={instaIcon} boxSize={6} />
    </IconButton>
    <Button
      size="xl"
      onClick={() => jumpToSection(SECTION_IDS.reservation)}
      w="230px"
      colorPalette="accent"
      variant="solid"
      boxShadow="0 4px 12px 0 rgba(255, 248, 237, 0.5)"
    >
      <Image src={suigetsuIcon} boxSize={8} alt="icon" />
      チケットを予約する
    </Button>
  </VStack>
);
