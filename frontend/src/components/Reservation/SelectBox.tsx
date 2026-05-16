import { Select, createListCollection } from "@chakra-ui/react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import type { SelectOption } from "../../const";

type FormSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName;
  placeholder: string;
  control: Control<TFieldValues>;
  collection: ReturnType<typeof createListCollection<SelectOption>>;
};

export const FormSelect = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  placeholder,
  collection,
  control,
}: FormSelectProps<TFieldValues, TName>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <Select.Root
        collection={collection}
        value={
          field.value === "" || field.value === 0 ? [] : [String(field.value)]
        }
        onValueChange={(details) => {
          const selectedValue = details.value[0] ?? "";
          field.onChange(
            typeof field.value === "number"
              ? Number(selectedValue)
              : selectedValue,
          );
        }}
        onInteractOutside={() => field.onBlur()}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={placeholder} />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item item={item} key={item.value} color="black">
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    )}
  />
);
