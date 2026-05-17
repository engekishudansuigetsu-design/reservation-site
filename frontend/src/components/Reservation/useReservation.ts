import { useCallback, useState } from "react";
import { usePostExec } from "../../lib/gas/default/default";
import type { ReserveInput } from "../../lib/gas/model";
import type { ReservationRequestFront } from "./type";
import { HORIZONTAL } from "../../const";

type UseReservationReturn = {
  onSubmit: (formData: ReservationRequestFront) => void;
  reservation: ReserveInput | undefined;
  isOpenConfirmDialog: boolean;
  onCancel: () => void;
  onPostReserve: () => Promise<void>;
  postReserveStatus: ReturnType<typeof usePostExec>["status"];
  postReserveIsLoading: boolean;
};

export const useReservation = (): UseReservationReturn => {
  const [reservation, setReservation] = useState<ReserveInput>();

  const {
    mutateAsync: postReserveMutateAsync,
    status: postReserveStatus,
    isPending: postReserveIsLoading,
  } = usePostExec();

  const getFindFromLabels = (
    values: string[] | undefined,
    findFromWho?: string,
    findFromOther?: string,
  ): string[] => {
    if (!values) return [];

    return HORIZONTAL.filter(({ value }) => values.includes(value)).map(
      ({ value }) => {
        if (value === "関係者") {
          return findFromWho ? `関係者: ${findFromWho}` : "関係者";
        }
        if (value === "その他") {
          return findFromOther ? `その他: ${findFromOther}` : "その他";
        }
        return value;
      },
    );
  };

  const onSubmit = useCallback<UseReservationReturn["onSubmit"]>(
    (formData: ReservationRequestFront) => {
      const reservationRequest: ReserveInput = {
        name: formData.name,
        email: formData.email,
        reserveId: formData.reserveId,
        count: formData.count,
        findFrom: getFindFromLabels(
          formData.findFrom,
          formData.findFromWho,
          formData.findFromOther,
        ),
        note: formData.note,
      };
      console.log(formData);
      setReservation(reservationRequest);
    },
    [],
  );

  const onCancel = useCallback(() => {
    setReservation(undefined);
  }, []);

  const onPostReserve = useCallback(async () => {
    if (!reservation) return;

    try {
      await postReserveMutateAsync({
        data: reservation,
      });
      // console.error("post reserve failed");

      setReservation(undefined);
    } catch (error) {
      console.error("post reserve failed", error);
    }
  }, [postReserveMutateAsync, reservation]);

  return {
    onSubmit,
    reservation,
    isOpenConfirmDialog: reservation !== undefined,
    onCancel,
    onPostReserve,
    postReserveStatus,
    postReserveIsLoading,
  };
};
