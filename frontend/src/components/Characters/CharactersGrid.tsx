import { SimpleGrid } from "@chakra-ui/react";
import { CharacterTile } from "./CharacterTIle";
import minazuki from "../../assets/character-minazuki.svg";
import kaidou from "../../assets/character-kaidou.svg";
import jumonji from "../../assets/character-jumonji.svg";
import auri from "../../assets/character-auri.svg";
import hanagasa from "../../assets/character-hanagasa.svg";
import beniko from "../../assets/character-beniko.svg";

export const CharacterGrid = () => (
  <SimpleGrid
    columns={{ base: 2, md: 3 }}
    columnGap={{ base: "4", md: "6" }}
    rowGap={{ base: "6", md: "10" }}
    w="full"
    alignItems="stretch"
  >
    <CharacterTile svgUrl={minazuki} name="水無月" credit="宮原瞬也">
      日本クラゲ研究所の所長。
      <br />
      妻の紅子の研究結果をもとに、
      <br />
      ベニクラゲ細胞を完成させた。
    </CharacterTile>
    <CharacterTile
      svgUrl={kaidou}
      name="海堂"
      credit="難波瑞穂"
      team="演劇集団すいげつ"
    >
      日本クラゲ研究所の副所長。
      <br />
      水無月と紅子の大学時代の先輩。
      <br />
      水無月と紅子を引き合わせた。
    </CharacterTile>
    <CharacterTile svgUrl={jumonji} name="十文字" credit="藤井歩輝">
      水無月の助手。
      <br />
      面倒事を他研究員から押し付けられがち。
      <br />
      よく紅子のフィールドワークに付き合っていた。
    </CharacterTile>
    <CharacterTile svgUrl={auri} name="アウリ" credit="紫吹結">
      日本クラゲ研究所に新しく赴任してきた研究員。
      <br />
      日本とアルバニアのハーフ。
      <br />
      気になったことは遠慮なく聞くタイプ。
    </CharacterTile>
    <CharacterTile svgUrl={hanagasa} name="花笠" credit="あつと">
      フリーの雑誌記者
    </CharacterTile>
    <CharacterTile
      svgUrl={beniko}
      name="紅子"
      credit="中西たにし"
      team="しゃんぐりら"
    >
      水無月の妻。
      <br />
      ベニクラゲの若返り因子を特定した。
      <br />
      フィールドワークが好きで、 <br />
      に塩の香りをまとっていた。
    </CharacterTile>
  </SimpleGrid>
);
