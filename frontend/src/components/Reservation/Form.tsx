import { Controller, useForm } from "react-hook-form";

import React from "react";
import {
  Input,
  Checkbox,
  Button,
  Textarea,
  Text,
  Stack,
  Field,
  CheckboxGroup,
  Fieldset,
  createListCollection,
} from "@chakra-ui/react";
import { HORIZONTAL } from "../../const";
import type { SelectOption } from "../../const";
import { RESERVATION_MASTER_SCHEDULE } from "@repo/shared/domain-model";
import { zodResolver } from "@hookform/resolvers/zod";

import { reservationSchemaFront, type ReservationRequestFront } from "./type";
import { FormSelect } from "./SelectBox";

const peopleCollection = createListCollection({
  items: Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1}人`,
    value: String(i + 1),
  })),
});

const reservationDateTimeCollection = createListCollection<SelectOption>({
  items: RESERVATION_MASTER_SCHEDULE.map((reservation) => ({
    value: reservation.reserveId,
    label: reservation.label,
  })),
});

const formsize = "600px";

const formSizeStyles = {
  base: "100%",
  md: formsize,
};

const onPushReservation = (values: ReservationRequestFront) => {
  console.log(values);
};

export const ReservationForm = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
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
    },
  });

  return (
    <form noValidate onSubmit={handleSubmit((data) => onPushReservation(data))}>
      <Stack gap="6" w="100%" maxW={formSizeStyles} mx="auto">
        <Field.Root required invalid={!!errors.name} w={formSizeStyles}>
          <Field.Label>
            お名前
            <Field.RequiredIndicator />
          </Field.Label>
          <Input placeholder="海月 太郎" {...register("name")} />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.email} w={formSizeStyles}>
          <Field.Label>
            メールアドレス
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type="email"
            placeholder="kurage@example.com"
            {...register("email")}
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.reserveId} w={formSizeStyles}>
          <Field.Label>
            観劇日時
            <Field.RequiredIndicator />
          </Field.Label>
          <FormSelect
            name="reserveId"
            placeholder="観劇日時を選択"
            collection={reservationDateTimeCollection}
            control={control}
            // value={selectedReserveId ? [selectedReserveId] : []}
            // onChange={handleReserveIdChange}
          />
          <Field.ErrorText>{errors.reserveId?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.count} w={formSizeStyles}>
          <Field.Label>
            予約人数
            <Field.RequiredIndicator />
          </Field.Label>
          {/* selectボックスの実装は長くなったので切り出し */}
          <FormSelect
            name="count"
            placeholder="人数を選択"
            control={control}
            collection={peopleCollection}
            // value={selectedCount ? [String(selectedCount)] : []}
          />
          <Field.ErrorText>{errors.count?.message}</Field.ErrorText>
        </Field.Root>

        <Fieldset.Root
          _required={{ color: "red.500" }}
          invalid={!!errors.findFrom}
          w={formSizeStyles}
        >
          <Fieldset.Legend>
            どこで本公演を知りましたか？
            <Text as="span" color="red.500" ml="1">
              *
            </Text>
          </Fieldset.Legend>
          <Controller
            name="findFrom"
            control={control}
            render={({ field }) => {
              const selectedFindFrom = field.value ?? [];
              const isOtherSelected = selectedFindFrom.includes("other");
              const isWhoSelected = selectedFindFrom.includes("contact");

              return (
                <CheckboxGroup
                  value={selectedFindFrom}
                  onValueChange={(value) =>
                    setValue("findFrom", value, { shouldValidate: isSubmitted })
                  }
                >
                  <Stack gap="2">
                    {HORIZONTAL.map((option) => (
                      <React.Fragment key={option.value}>
                        <Checkbox.Root value={option.value}>
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                          <Checkbox.Label>{option.label}</Checkbox.Label>
                        </Checkbox.Root>

                        {isWhoSelected && option.value === "contact" && (
                          <Field.Root mb={3}>
                            <Input
                              placeholder="関係者名をご記入してください"
                              {...register("findFromWho")}
                            />
                          </Field.Root>
                        )}

                        {isOtherSelected && option.value === "other" && (
                          <Field.Root mb={3}>
                            <Textarea
                              placeholder="具体的にご記入ください"
                              {...register("findFromOther")}
                            />
                          </Field.Root>
                        )}
                      </React.Fragment>
                    ))}
                  </Stack>
                </CheckboxGroup>
              );
            }}
          />

          <Fieldset.ErrorText>{errors.findFrom?.message}</Fieldset.ErrorText>
        </Fieldset.Root>

        <Field.Root w={formSizeStyles}>
          <Field.Label>備考</Field.Label>
          <Textarea
            placeholder="その他備考があればこちらに入力してください"
            {...register("note")}
          />
        </Field.Root>

        <Button type="submit">内容を確認する</Button>
      </Stack>
    </form>
  );
};
