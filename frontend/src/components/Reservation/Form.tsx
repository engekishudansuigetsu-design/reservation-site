import { Input, Checkbox, Button, Textarea, Select, Stack, Field, CheckboxGroup, Fieldset, createListCollection } from "@chakra-ui/react";
import { useState } from "react";
import { RESERVATION_DATE_TIME, HORIZONTAL } from "../../const";

const peopleCollection = createListCollection({
	items: Array.from({ length: 10 }, (_, i) => ({
		label: `${i + 1}人`,
		value: String(i + 1),
	})),
});

export const ReservationForm = () => {
	const [reservationDateTime, setReservationDateTime] = useState<string[]>([]);
	const [horizontal, setHorizontal] = useState<string[]>([]);
	const [people, setPeople] = useState<string[]>([]);

	return (
		<form>
			<Stack gap="6" maxW="sm">
				<Field.Root required>
					<Field.Label>お名前</Field.Label>
					<Input placeholder="水月 太郎" />
				</Field.Root>

				<Field.Root required>
					<Field.Label>メールアドレス</Field.Label>
					<Input type="email" placeholder="kurage@example.com" />
				</Field.Root>

				<Fieldset.Root>
					<Fieldset.Legend>観劇日時</Fieldset.Legend>
					<CheckboxGroup
						value={reservationDateTime}
						onValueChange={setReservationDateTime}
					>
						<Stack gap="2">
							{RESERVATION_DATE_TIME.map((option) => (
								<Checkbox.Root key={option.value} value={option.value}>
									<Checkbox.HiddenInput />
									<Checkbox.Control />
									<Checkbox.Label>{option.label}</Checkbox.Label>
								</Checkbox.Root>
							))}
						</Stack>
					</CheckboxGroup>
				</Fieldset.Root>

				<Field.Root required>
					<Field.Label>予約人数</Field.Label>
					<Select.Root
						collection={peopleCollection}
						value={people}
						onValueChange={(details) => setPeople(details.value)}
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
				</Field.Root>

				<Fieldset.Root>
					<Fieldset.Legend>どこで本公演を知りましたか？</Fieldset.Legend>
					<CheckboxGroup value={horizontal} onValueChange={setHorizontal}>
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

