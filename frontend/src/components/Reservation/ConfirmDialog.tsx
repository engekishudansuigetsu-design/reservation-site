import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { useRef } from "react";
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
  const ref = useRef<HTMLInputElement | null>(null);
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
                  <Field.Root>
                    <Field.Label>お名前</Field.Label>
                    <Input readOnly value={reservation?.name ?? ""} />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>メールアドレス</Field.Label>
                    <Input
                      readOnly
                      ref={ref}
                      value={reservation?.email ?? ""}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>観劇日時</Field.Label>
                    <Input
                      readOnly
                      ref={ref}
                      value={reservation?.reserveId ?? ""}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>予約人数</Field.Label>
                    <Input
                      readOnly
                      ref={ref}
                      value={reservation?.count ?? ""}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>どこで本公演を知りましたか？</Field.Label>
                    <Input
                      readOnly
                      ref={ref}
                      value={reservation?.findFrom?.join(", ") ?? ""}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>備考</Field.Label>
                    <Input readOnly ref={ref} value={reservation?.note ?? ""} />
                  </Field.Root>
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
