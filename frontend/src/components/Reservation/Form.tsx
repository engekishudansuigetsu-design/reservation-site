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
import { RESERVATION_DATE_TIME, HORIZONTAL } from "../../const";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  reservationSchema,
  type ReservationRequest,
} from "@repo/shared/domain-model";
import { FormSelect } from "./SelectBox";

const peopleCollection = createListCollection({
  items: Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1}人`,
    value: String(i + 1),
  })),
});

export const ReservationForm = () => {
  const reservationDateTimeCollection = createListCollection({
    items: RESERVATION_DATE_TIME,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitted },
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

  const formsize = "600px";
  const formSizeStyles = {
    base: "100%",
    md: formsize,
  };

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
            placeholder="観劇日時を選択"
            collection={reservationDateTimeCollection}
            value={watch("reserveId") ? [String(watch("reserveId"))] : []}
            onChange={(value: string[]) =>
              setValue("reserveId", value[0], { shouldValidate: true })
            }
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
            placeholder="人数を選択"
            collection={peopleCollection}
            value={watch("count") ? [String(watch("count"))] : []}
            onChange={(value: string[]) =>
              setValue("count", Number(value[0]), { shouldValidate: true })
            }
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
          <CheckboxGroup
            value={watch("findFrom") ?? []}
            onValueChange={(value) =>
              setValue("findFrom", value, { shouldValidate: isSubmitted })
            }
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
          {watch("findFrom").includes("other") && (
            <Field.Root mt={3}>
              <Field.Label>その他（詳細）</Field.Label>
              <Textarea placeholder="具体的にご記入ください" />
            </Field.Root>
          )}
          <Fieldset.ErrorText>{errors.findFrom?.message}</Fieldset.ErrorText>
        </Fieldset.Root>

        <Field.Root w={formSizeStyles}>
          <Field.Label>備考</Field.Label>
          <Textarea placeholder="備考があればこちらに入力してください" />
        </Field.Root>

        <Button type="submit">内容を確認する</Button>
      </Stack>
    </form>
  );
};
