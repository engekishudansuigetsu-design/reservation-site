import { useCallback, useState } from "react";
import { usePostExec } from "../../lib/gas/default/default";
import type { ReserveInput } from "../../lib/gas/model";
import type { ReservationRequestFront } from "./type";
import { FIND_FROM_ITEMS } from "../../const";
import { useGlobalError } from "../../provider/errorProvider/useGlobalError";
import { isApiErrorResponse } from "../../utils";

type UseReservationReturn = {
  onSubmit: (formData: ReservationRequestFront) => void;
  reservation: ReserveInput | undefined;
  isOpenConfirmDialog: boolean;
  onCancel: () => void;
  onPostReserve: () => Promise<void>;
  postReserveStatus: ReturnType<typeof usePostExec>["status"];
  postReserveIsLoading: boolean;
  setTurnstileToken: (token: string) => void;
};

type FindFromInput = Pick<
  ReservationRequestFront,
  "findFrom" | "findFromWho" | "findFromOther"
>;

const getFindFromLabels = ({
  findFrom,
  findFromWho,
  findFromOther,
}: FindFromInput): string[] => {
  if (!findFrom) return [];
  return FIND_FROM_ITEMS.filter(({ value }) => findFrom.includes(value)).map(
    ({ value }) => {
      if (value === "関係者") {
        return findFromWho ? `関係者: (${findFromWho})` : "関係者";
      }
      if (value === "その他") {
        return findFromOther ? `その他: (${findFromOther})` : "その他";
      }
      return value;
    },
  );
};

export const useReservation = (): UseReservationReturn => {
  const { showError } = useGlobalError();
  const [reservation, setReservation] = useState<ReserveInput>();
  const [turnstileToken, setTurnstileToken] = useState("");

  const {
    mutateAsync: postReserveMutateAsync,
    status: postReserveStatus,
    isPending: postReserveIsLoading,
  } = usePostExec();

  const onSubmit = useCallback<UseReservationReturn["onSubmit"]>(
    (formData: ReservationRequestFront) => {
      const reservationRequest: ReserveInput = {
        name: formData.name,
        email: formData.email,
        reserveId: formData.reserveId,
        count: formData.count,
        findFrom: getFindFromLabels({
          findFrom: formData.findFrom,
          findFromWho: formData.findFromWho,
          findFromOther: formData.findFromOther,
        }),
        note: formData.note,
        age: formData.age,
      };
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
        data: { reservation, turnstileToken },
      });

      setReservation(undefined);
    } catch (error) {
      console.log(error);
      if (isApiErrorResponse(error)) {
        showError(error.message);
        return;
      }
      showError("予約に失敗しました。\nもう一度おためしください。");
    }
  }, [postReserveMutateAsync, reservation, showError, turnstileToken]);

  return {
    onSubmit,
    reservation,
    isOpenConfirmDialog: reservation !== undefined,
    onCancel,
    onPostReserve,
    postReserveStatus,
    postReserveIsLoading,
    setTurnstileToken,
  };
};
