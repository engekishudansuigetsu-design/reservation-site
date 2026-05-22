import { Box, Table } from "@chakra-ui/react";

export const InfoTable = () => (
  <Table.Root
    size="lg"
    fontFamily="default"
    w={{ base: "fit-content", md: "60%" }}
  >
    <Table.Body>
      <Table.Row bg="transparent">
        <Table.ColumnHeader color="white" wordBreak="keep-all">
          公演時間
        </Table.ColumnHeader>
        <Table.Cell>70分</Table.Cell>
      </Table.Row>

      <Table.Row bg="transparent">
        <Table.ColumnHeader color="white" wordBreak="keep-all">
          開催日程
        </Table.ColumnHeader>
        <Table.Cell>
          TODO!!!!!!! 2026年7月18(土)~19(日)
          <Box as="ul" listStylePosition="inside">
            <li>7/18(土) 昼の回 </li>
            <li>7/18(土) 夜の回</li>
            <li>7/19(日) 昼の回</li>
            <li>7/19(日) 夜の回</li>
          </Box>
        </Table.Cell>
      </Table.Row>
      <Table.Row bg="transparent">
        <Table.ColumnHeader color="white">料金</Table.ColumnHeader>
        <Table.Cell>無料(フリーカンパ制)</Table.Cell>
      </Table.Row>
      <Table.Row bg="transparent">
        <Table.ColumnHeader color="white" borderBottom="none">
          会場
        </Table.ColumnHeader>
        <Table.Cell borderBottom="none">
          スタジオ空洞
          <br />
          池袋駅より徒歩7分
          <br />
          東京都豊島区池袋3-60-5
          <br />
          地下１階
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table.Root>
);
