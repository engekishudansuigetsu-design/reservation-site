import { Controller } from "react-hook-form";
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
  Flex,
} from "@chakra-ui/react";
import { FIND_FROM_ITEMS } from "../../const";

import { FormSelect } from "./SelectBox";
import { ShiningButton } from "../Common/ShiningButton";

import { type UseReservationReturn } from "./useReservation";
import { useReservationForm } from "./useReservationForm";
import { fieldNameMap } from "@repo/shared/domain-model";

const formsize = "600px";

const formSizeStyles = {
  base: "100%",
  md: formsize,
};

type ReservationFormProps = {
  onSubmit: UseReservationReturn["onSubmit"];
};

export const ReservationForm = ({ onSubmit }: ReservationFormProps) => {
  const {
    control,
    register,
    resetField,
    errors,
    selectedReserveId,
    reserveIdList,
    isLoadingReserveIdList,
    reservationCount,
    handleSubmit,
  } = useReservationForm({ onSubmit });

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Stack gap="6" w="100%" maxW={formSizeStyles} mx="auto">
        <Field.Root required invalid={!!errors.name} w={formSizeStyles}>
          <Field.Label>
            {fieldNameMap.name}
            <Field.RequiredIndicator />
          </Field.Label>
          <Input placeholder="海月 太郎" {...register("name")} fontSize="md" />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.email} w={formSizeStyles}>
          <Field.Label>
            {fieldNameMap.email}
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type="email"
            placeholder="kurage@example.com"
            {...register("email")}
            fontSize="md"
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.reserveId} w={formSizeStyles}>
          <Field.Label>
            {fieldNameMap.reserveId}
            <Field.RequiredIndicator />
          </Field.Label>
          <FormSelect
            name="reserveId"
            placeholder={
              isLoadingReserveIdList ? "予約日時を読み込み中" : "観劇日時を選択"
            }
            collection={reserveIdList}
            control={control}
            onValueChange={() => resetField("count", { defaultValue: 0 })}
          />
          <Field.ErrorText>{errors.reserveId?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.count} w={formSizeStyles}>
          <Field.Label>
            {fieldNameMap.count}
            <Field.RequiredIndicator />
          </Field.Label>
          <FormSelect
            name="count"
            placeholder="人数を選択"
            control={control}
            collection={reservationCount}
            disabled={selectedReserveId === ""}
          />
          <Field.ErrorText>{errors.count?.message}</Field.ErrorText>
        </Field.Root>

        <Fieldset.Root
          _required={{ color: "red.500" }}
          invalid={!!errors.findFrom}
          w={formSizeStyles}
        >
          <Fieldset.Legend>
            {fieldNameMap.findFrom}
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
                        <Checkbox.Root
                          value={option.value}
                          colorPalette="accent"
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                          <Checkbox.Label fontSize="md">
                            {option.label}
                          </Checkbox.Label>
                        </Checkbox.Root>

                        {isWhoSelected && option.value === "関係者" && (
                          <Field.Root mb={3} invalid={!!errors.findFromWho}>
                            <Input
                              placeholder="関係者名をご記入してください（50文字）"
                              {...register("findFromWho")}
                              fontSize="md"
                            />
                            <Field.ErrorText>
                              {errors.findFromWho?.message}
                            </Field.ErrorText>
                          </Field.Root>
                        )}

                        {isOtherSelected && option.value === "その他" && (
                          <Field.Root mb={3} invalid={!!errors.findFromOther}>
                            <Textarea
                              placeholder="具体的にご記入ください（50文字）"
                              {...register("findFromOther")}
                              fontSize="md"
                            />
                            <Field.ErrorText>
                              {errors.findFromOther?.message}
                            </Field.ErrorText>
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
          <Field.Label>{fieldNameMap.note}</Field.Label>
          <Textarea
            placeholder="その他備考があればこちらに入力してください"
            {...register("note")}
            fontSize="md"
          />
        </Field.Root>

        <Input
          {...register("age")}
          tabIndex={-1}
          autoComplete="off"
          placeholder="年齢"
          position="absolute"
          opacity={0}
          pointerEvents="none"
          w="1px"
          h="1px"
          overflow="hidden"
        />

        <Flex direction="column" alignItems="center">
          <ShiningButton type="submit" colorPalette="brand">
            内容を確認する
          </ShiningButton>
        </Flex>
      </Stack>
    </form>
  );
};
