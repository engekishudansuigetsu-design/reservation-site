import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { useRef } from "react";
import type { ReserveInput } from "../../lib/gas/model";
import {
  FIND_FROM_ITEMS,
  PEOPLE_COLLECTION,
  RESERVATIONDATETIME_COLLECTION,
  type SelectOption,
} from "../../const";
import type { ReservationRequestFront } from "./type";

type ReservationDialogProps = {
  reservation: ReserveInput | undefined;
  confirmReservation: ReservationRequestFront | undefined;
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

const getFindFromLabels = (
  values: string[] | undefined,
  findFromWho?: string,
  findFromOther?: string,
): string => {
  if (!values) return "";

  return values
    .map((value) => {
      if (value === "contact") {
        return findFromWho ? `関係者: ${findFromWho}` : "関係者";
      }

      if (value === "other") {
        return findFromOther ? `その他: ${findFromOther}` : "その他";
      }

      return getReservationLabel(value, FIND_FROM_ITEMS);
    })
    .join(", ");
};

export const ConfirmDialog = ({
  reservation,
  isOpen,
  confirmReservation,
  onCancel,
  onOk,
  isPosting,
}: ReservationDialogProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
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
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title textAlign="center">
                  以下の内容で予約します。よろしいですか？
                </Dialog.Title>
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
                      value={getReservationLabel(
                        reservation?.reserveId ?? "",
                        RESERVATIONDATETIME_COLLECTION.items,
                      )}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>予約人数</Field.Label>
                    <Input
                      readOnly
                      ref={ref}
                      value={getReservationLabel(
                        String(reservation?.count ?? ""),
                        PEOPLE_COLLECTION.items,
                      )}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>どこで本公演を知りましたか？</Field.Label>
                    <Input
                      readOnly
                      ref={ref}
                      value={getFindFromLabels(
                        confirmReservation?.findFrom,
                        confirmReservation?.findFromWho,
                        confirmReservation?.findFromOther,
                      )}
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
