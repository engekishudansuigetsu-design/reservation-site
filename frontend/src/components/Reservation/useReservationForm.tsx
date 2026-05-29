import { useMemo, type FormEventHandler } from "react";
import { useGetExec } from "../../lib/gas/default/default";
import { createListCollection } from "@chakra-ui/react";
import type { SelectOption } from "../../const";
import { formatReservationIdLabel } from "../../util/formatReservationIdLabel";
import { reservationSchemaFront, type ReservationRequestFront } from "./type";
import {
  useForm,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormResetField,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type UseReservationFormReturn = {
  control: Control<ReservationRequestFront>;
  register: UseFormRegister<ReservationRequestFront>;
  resetField: UseFormResetField<ReservationRequestFront>;
  errors: FieldErrors<ReservationRequestFront>;
  selectedReserveId: string;
  reserveIdList: ReturnType<typeof createListCollection<SelectOption>>;
  isLoadingReserveIdList: boolean;
  reservationCount: ReturnType<typeof createListCollection<SelectOption>>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

type UseReservationFormProps = {
  onSubmit: (formData: ReservationRequestFront) => void;
};

export const useReservationForm = ({
  onSubmit,
}: UseReservationFormProps): UseReservationFormReturn => {
  const {
    control,
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reservationSchemaFront),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      reserveId: "",
      count: 0,
      findFrom: [],
      findFromOther: "",
      note: "",
      age: "",
    },
  });

  const selectedReserveId = watch("reserveId");

  const { data: reserveStatusList, isLoading: isLoadingReserveIdList } =
    useGetExec();

  const reserveIdList = useMemo(() => {
    if (!reserveStatusList) {
      return createListCollection<SelectOption>({
        items: [
          {
            label: "",
            value: "",
            disabled: true,
          },
        ],
      });
    }
    return createListCollection<SelectOption>({
      items: reserveStatusList.map((reserveStatus) => ({
        label: `${formatReservationIdLabel(reserveStatus.reserveId)} ${reserveStatus.remainCount <= 5 ? `(残席数：${reserveStatus.remainCount})` : ""}`,
        value: reserveStatus.reserveId,
        disabled: reserveStatus.remainCount === 0,
      })),
    });
  }, [reserveStatusList]);

  const selectedReserveStatus = reserveStatusList?.find(
    (reserveStatus) => reserveStatus.reserveId === selectedReserveId,
  );

  const reservationCount = useMemo(() => {
    if (!selectedReserveStatus) {
      return createListCollection<SelectOption>({
        items: [
          {
            label: "",
            value: "",
          },
        ],
      });
    }

    return createListCollection<SelectOption>({
      items: Array.from(
        { length: selectedReserveStatus.remainCount },
        (_, i) => ({
          label: `${i + 1}人`,
          value: String(i + 1),
        }),
      ),
    });
  }, [selectedReserveStatus]);

  return {
    control,
    register,
    resetField,
    errors,
    selectedReserveId,
    reserveIdList,
    isLoadingReserveIdList,
    reservationCount,
    handleSubmit: handleSubmit(onSubmit),
  };
};
