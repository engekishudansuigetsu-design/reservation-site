import { Select, createListCollection } from "@chakra-ui/react";
// 本コンポーネントはFormコンポーネントより呼び出すことを想定し、Selectコンポーネントをラップしたものです。
type SelectOption = {
  label: string;
  value: string;
};

type FormSelectProps = {
  placeholder: string;
  collection: ReturnType<typeof createListCollection<SelectOption>>;
  value: string[];
  onChange: (value: string[]) => void;
};

export const FormSelect = ({
  placeholder,
  collection,
  value,
  onChange,
}: FormSelectProps) => (
  <Select.Root
    collection={collection}
    value={value}
    onValueChange={(details) => onChange(details.value)}
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
);
