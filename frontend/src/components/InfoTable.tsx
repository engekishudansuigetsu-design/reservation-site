import { Box, Link, Table, Text } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";

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
        <Table.Cell>約70分</Table.Cell>
      </Table.Row>

      <Table.Row bg="transparent">
        <Table.ColumnHeader color="white" wordBreak="keep-all">
          開催日程
        </Table.ColumnHeader>
        <Table.Cell>
          <Box as="ul" listStylePosition="inside">
            <li>7/18(土) 13:00開演</li>
            <li>7/18(土) 17:00開演</li>
            <li>7/19(日) 12:00開演</li>
            <li>7/19(日) 16:00開演</li>
          </Box>
          <Text ml={3} fontSize="sm">
            開場はいずれも開演30分前
          </Text>
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
          <Text>スタジオ空洞</Text>
          <Text fontSize="xs" ml={3} mt={2} lineHeight={1.5}>
            池袋駅より徒歩7分
            <br />
            東京都豊島区池袋3-60-5
            <br />
            地下１階
          </Text>
          <Link
            href="https://maps.google.com/?q=東京都豊島区池袋3-60-5"
            target="_blank"
            rel="noopener noreferrer"
            color="white"
            variant="underline"
            ml={3}
          >
            <LuExternalLink />
            Google Map
          </Link>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table.Root>
);
