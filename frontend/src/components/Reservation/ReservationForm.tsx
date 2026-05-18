import { Controller, useForm } from "react-hook-form";
import React from "react";
import {
  Input,
  Checkbox,
  Textarea,
  Text,
  Stack,
  Field,
  CheckboxGroup,
  Fieldset,
  Button,
} from "@chakra-ui/react";
import { FIND_FROM_ITEMS, PEOPLE_COLLECTION } from "../../const";
import { zodResolver } from "@hookform/resolvers/zod";

import { reservationSchemaFront } from "./type";
import { FormSelect } from "./SelectBox";

import type { UseReservationReturn } from "./useReservation";

const formsize = "600px";

const formSizeStyles = {
  base: "100%",
  md: formsize,
};

type ReservationFormProps = {
  onSubmit: UseReservationReturn["onSubmit"];
  reserveIdList: UseReservationReturn["reserveIdList"];
  isLoadingReserveIdList: UseReservationReturn["isLoadingReserveIdList"];
};

export const ReservationForm = ({
  onSubmit,
  reserveIdList,
  isLoadingReserveIdList,
}: ReservationFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    resetField,
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
    },
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
            placeholder={
              isLoadingReserveIdList ? "予約日時を読み込み中" : "観劇日時を選択"
            }
            collection={reserveIdList}
            control={control}
          />
          <Field.ErrorText>{errors.reserveId?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.count} w={formSizeStyles}>
          <Field.Label>
            予約人数
            <Field.RequiredIndicator />
          </Field.Label>
          <FormSelect
            name="count"
            placeholder="人数を選択"
            control={control}
            collection={PEOPLE_COLLECTION}
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
              const isWhoSelected = selectedFindFrom.includes("関係者");
              const isOtherSelected = selectedFindFrom.includes("その他");

              return (
                <CheckboxGroup
                  value={selectedFindFrom}
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (!value.includes("関係者")) {
                      resetField("findFromWho");
                    }
                    if (!value.includes("その他")) {
                      resetField("findFromOther");
                    }
                  }}
                >
                  <Stack gap="2">
                    {FIND_FROM_ITEMS.map((option) => (
                      <React.Fragment key={option.value}>
                        <Checkbox.Root value={option.value}>
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                          <Checkbox.Label>{option.label}</Checkbox.Label>
                        </Checkbox.Root>

                        {isWhoSelected && option.value === "関係者" && (
                          <Field.Root mb={3}>
                            <Input
                              placeholder="関係者名をご記入してください"
                              {...register("findFromWho")}
                            />
                          </Field.Root>
                        )}

                        {isOtherSelected && option.value === "その他" && (
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
