import { Select, createListCollection } from "@chakra-ui/react";
import { Controller, type Control, type FieldValues } from "react-hook-form";
import type { ReservationRequestFront } from "./type";

type SelectOption = {
  label: string;
  value: string;
};

type FormSelectProps = {
  name: "reserveId" | "count";
  placeholder: string;
  collection: ReturnType<typeof createListCollection<SelectOption>>;
  control: Control<ReservationRequestFront>;
};

export const FormSelect = ({
  name,
  placeholder,
  collection,
  control,
}: FormSelectProps) => (
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
          if (name === "count") {
            field.onChange(Number(selectedValue));
            return;
          }
          field.onChange(selectedValue);
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
              <Select.Item item={item} key={item.value}>
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
