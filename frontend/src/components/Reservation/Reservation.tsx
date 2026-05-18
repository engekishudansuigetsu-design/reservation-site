import { ConfirmDialog } from "./ConfirmDialog";
import { useReservation } from "./useReservation";
import { ReservationForm } from "./ReservationForm";
import { Heading, Stack, Text } from "@chakra-ui/react";

export const Reservation = () => {
  const {
    onSubmit,
    reservation,
    isOpenConfirmDialog,
    postReserveStatus,
    onCancel,
    onPostReserve,
    postReserveIsLoading,
    reserveIdList,
    isLoadingReserveIdList,
  } = useReservation();

  return (
    <>
      {postReserveStatus === "success" ? (
        <Stack gap="4" textAlign="center">
          <Heading size="lg">ご予約ありがとうございます。</Heading>

          <Text>予約の受付が完了しました。</Text>

          <Text>
            ご登録のメールアドレス宛に確認メールをお送りしておりますので、
            <br />
            公演当日まで大切に保管してください。
          </Text>

          <Text>
            万が一メールが届かない場合は、
            <br />
            迷惑メールフォルダをご確認ください。
          </Text>

          <Text textStyle="sm" color="gray.500">
            ※メールが届かない場合は、迷惑メールフォルダをご確認いただくか、
            <br />
            engekishudan.suigetsu@gmail.com までお問い合わせください。
          </Text>
        </Stack>
      ) : (
        <ReservationForm
          onSubmit={onSubmit}
          reserveIdList={reserveIdList}
          isLoadingReserveIdList={isLoadingReserveIdList}
        />
      )}

      <ConfirmDialog
        reservation={reservation}
        isOpen={isOpenConfirmDialog}
        reserveIdList={reserveIdList}
        onCancel={onCancel}
        onOk={onPostReserve}
        isPosting={postReserveIsLoading}
      />
    </>
  );
};
