import { Button, Dialog, Portal, Stack, Text } from "@chakra-ui/react";
import type { ReserveInput } from "../../lib/gas/model";

type ReservationDialogProps = {
  reservation: ReserveInput | undefined;
  isOpenConfirmDialog: boolean;
  onCancel: () => void;
  onPostReserve: () => Promise<void>;
};

export const ConfirmDialog = ({
  reservation,
  isOpenConfirmDialog,
  onCancel,
  onPostReserve,
}: ReservationDialogProps) => {
  return (
    <>
      <Dialog.Root lazyMount open={isOpenConfirmDialog}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>予約内容の確認</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <Stack gap="4">
                  <Text>お名前：{reservation?.name ?? ""}</Text>
                  <Text>メールアドレス：{reservation?.email ?? ""}</Text>
                  <Text>観劇日時：{reservation?.reserveId ?? ""}</Text>
                  <Text>予約人数：{reservation?.count ?? ""}</Text>
                  <Text>
                    どこで本公演を知りましたか？：
                    {reservation?.findFrom?.join(", ") ?? ""}
                  </Text>
                  <Text>備考：{reservation?.note ?? ""}</Text>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" onClick={onCancel}>
                    キャンセル
                  </Button>
                </Dialog.ActionTrigger>
                <Button onClick={onPostReserve}>送信する</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};
