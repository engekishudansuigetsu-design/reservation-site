import { Button, Dialog, Portal, Stack, Text } from "@chakra-ui/react";
import type { ReserveInput } from "../../lib/gas/model";
import { type SelectOption } from "../../const";
import {
  useReservationCount,
  type UseReservationReturn,
} from "./useReservation";

type ReservationDialogProps = {
  reservation: ReserveInput | undefined;
  reserveIdList: UseReservationReturn["reserveIdList"];
  isOpen: boolean;
  onCancel: () => void;
  onOk: () => Promise<void>;
  isPosting: boolean;
};

const getReservationLabel = (
  value: string,
  collection: SelectOption[],
): string => {
  return collection.find((item) => item.value === value)?.label ?? value;
};

const dialogStyle = {
  width: {
    base: "calc(100vw - 32px)",
    sm: "sm",
    md: "md",
  },
  maxW: "600px",
  maxH: "calc(100vh - 32px)",
  overflow: "auto",
  borderRadius: {
    base: "xl",
    md: "2xl",
  },
} as const;

export const ConfirmDialog = ({
  reservation,
  reserveIdList,
  isOpen,
  onCancel,
  onOk,
  isPosting,
}: ReservationDialogProps) => {
  const { reservationCount } = useReservationCount({
    reservationId: reservation?.reserveId ?? "",
  });
  return (
    <>
      <Dialog.Root
        lazyMount
        open={isOpen}
        closeOnInteractOutside={false}
        closeOnEscape={false}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content {...dialogStyle}>
              <Dialog.Header>
                <Dialog.Title textAlign="center">
                  以下の内容で予約します。よろしいですか？
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <Stack gap="4">
                  <Text>お名前：{reservation?.name ?? ""}</Text>
                  <Text>メールアドレス：{reservation?.email ?? ""}</Text>
                  <Text>
                    観劇日時：
                    {getReservationLabel(
                      reservation?.reserveId ?? "",
                      reserveIdList.items,
                    )}
                  </Text>
                  <Text>
                    予約人数：
                    {getReservationLabel(
                      String(reservation?.count ?? ""),
                      reservationCount.items,
                    )}
                  </Text>
                  <Text whiteSpace="pre-line">
                    {`どこで本公演を知りましたか？：\n${reservation?.findFrom?.join("\n") ?? ""}`}
                  </Text>
                  <Text>備考：{reservation?.note ?? ""}</Text>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={onCancel}
                    disabled={isPosting}
                  >
                    キャンセル
                  </Button>
                </Dialog.ActionTrigger>
                <Button onClick={onOk} loading={isPosting}>
                  予約
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};
