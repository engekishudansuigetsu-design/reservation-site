import { Button, Dialog, Portal, Stack, Text } from "@chakra-ui/react";
import type { ReserveInput } from "../../lib/gas/model";
import { formatReservationIdLabel } from "../../util/formatReservationIdLabel";
import { Turnstile } from "../../Turnstile";

type ReservationDialogProps = {
  reservation: ReserveInput | undefined;
  isOpen: boolean;
  onCancel: () => void;
  onOk: () => Promise<void>;
  isPosting: boolean;
  isVerify: boolean;
  onVerifyTurnstile: (token: string) => void;
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
  color: "#140a00",
} as const;

export const ConfirmDialog = ({
  reservation,
  isOpen,
  onCancel,
  onOk,
  isPosting,
  isVerify,
  onVerifyTurnstile,
}: ReservationDialogProps) => {
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
                  <Text color="#140a00">お名前：{reservation?.name ?? ""}</Text>
                  <Text color="#140a00">
                    メールアドレス：{reservation?.email ?? ""}
                  </Text>
                  <Text color="#140a00">
                    観劇日時：
                    {formatReservationIdLabel(reservation?.reserveId)}
                  </Text>
                  <Text color="#140a00">
                    予約人数：
                    {reservation?.count}人
                  </Text>
                  <Text whiteSpace="pre-line" color="#140a00">
                    {`どこで本公演を知りましたか？：\n${reservation?.findFrom?.join("\n") ?? ""}`}
                  </Text>
                  <Text color="#140a00">備考：{reservation?.note ?? ""}</Text>
                </Stack>
              </Dialog.Body>
              <Turnstile onVerify={onVerifyTurnstile} />
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
                <Button
                  onClick={onOk}
                  loading={isPosting || isVerify}
                  disabled={isPosting || isVerify}
                  colorPalette="brand"
                >
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
