import { ConfirmDialog } from "./ConfirmDialog";
import { useReservation } from "./useReservation";
import { ReservationForm } from "./ReservationForm";

export const Reservation = () => {
  const {
    onSubmit,
    reservation,
    isOpenConfirmDialog,
    postReserveStatus,
    onCancel,
    onPostReserve,
  } = useReservation();

  return (
    <>
      {postReserveStatus === "success" ? (
        <p>ありがとう！！</p>
      ) : (
        <ReservationForm onSubmit={onSubmit} />
      )}

      <ConfirmDialog
        reservation={reservation}
        isOpenConfirmDialog={isOpenConfirmDialog}
        onCancel={onCancel}
        onPostReserve={onPostReserve}
      />
    </>
  );
};
