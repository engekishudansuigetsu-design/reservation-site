import {
  Input,
  Checkbox,
  Button,
  Textarea,
  Select,
  Stack,
  Field,
  CheckboxGroup,
  Fieldset,
  createListCollection,
} from "@chakra-ui/react";
import { useState } from "react";
import { RESERVATION_DATE_TIME, HORIZONTAL } from "../../const";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  reservationSchema,
  type ReservationRequest,
} from "@repo/shared/domain-model";

// import reservationSchema from "shared/domain-model/reservationSchema";

const peopleCollection = createListCollection({
  items: Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1}人`,
    value: String(i + 1),
  })),
});

export const ReservationForm = () => {
  const [horizontal, setHorizontal] = useState<string[]>([]);
  const reservationDateTimeCollection = createListCollection({
    items: RESERVATION_DATE_TIME,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      reserveId: "",
      count: 0,
      findFrom: [],
      note: "",
    },
  });
  const onPushReservation = (values: ReservationRequest) => {
    console.log(values);
  };
  return (
    <form noValidate onSubmit={handleSubmit((data) => onPushReservation(data))}>
      <Stack gap="6" maxW="sm">
        <Field.Root required invalid={!!errors.name}>
          <Field.Label>
            お名前
            <Field.RequiredIndicator />
          </Field.Label>
          <Input placeholder="水月 太郎" {...register("name")} />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.email}>
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

        <Field.Root required invalid={!!errors.reserveId}>
          <Field.Label>
            観劇日時
            <Field.RequiredIndicator />
          </Field.Label>

          <Select.Root
            collection={reservationDateTimeCollection}
            value={watch("reserveId") ? [watch("reserveId")] : []}
            onValueChange={(details) => {
              setValue("reserveId", details.value[0] ?? "", {
                shouldValidate: true,
              });
            }}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="観劇日時を選択" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>

            <Select.Positioner>
              <Select.Content>
                {reservationDateTimeCollection.items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>

          <Field.ErrorText>{errors.reserveId?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.count}>
          <Field.Label>
            予約人数
            <Field.RequiredIndicator />
          </Field.Label>
          {/* 当ファイルの上部に定義されているpeopleCollectionを使用して、Selectコンポーネントで人数を選択できるようにしています */}
          <Select.Root
            collection={peopleCollection}
            value={watch("count") ? [String(watch("count"))] : []}
            onValueChange={(details) =>
              setValue("count", parseInt(details.value[0] ?? ""), {
                shouldValidate: true,
              })
            }
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="人数を選択" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                {peopleCollection.items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
          <Field.ErrorText>{errors.count?.message}</Field.ErrorText>
        </Field.Root>

        <Fieldset.Root
          _required={{ color: "red.500" }}
          invalid={!!errors.findFrom}
        >
          <Fieldset.Legend>どこで本公演を知りましたか？</Fieldset.Legend>

          {/* <Fieldset.RequiredIndicator /> */}
          <CheckboxGroup
            value={watch("findFrom") ?? []}
            onValueChange={(value) => setValue("findFrom", value)}
          >
            <Stack gap="2">
              {HORIZONTAL.map((option) => (
                <Checkbox.Root key={option.value} value={option.value}>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>{option.label}</Checkbox.Label>
                </Checkbox.Root>
              ))}
            </Stack>
          </CheckboxGroup>
          {horizontal.includes("other") && (
            <Field.Root mt={3}>
              <Field.Label>その他（詳細）</Field.Label>
              <Textarea placeholder="具体的にご記入ください" />
            </Field.Root>
          )}
          <Fieldset.ErrorText>{errors.findFrom?.message}</Fieldset.ErrorText>
        </Fieldset.Root>

        <Field.Root>
          <Field.Label>備考</Field.Label>
          <Textarea placeholder="備考があればこちらに入力してください" />
        </Field.Root>

        <Button type="submit">内容を確認する</Button>
      </Stack>
    </form>
  );
};
