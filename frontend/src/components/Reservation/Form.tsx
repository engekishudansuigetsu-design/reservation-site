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
					<Input placeholder="観劇日時" />
				</Fieldset.Root>

				<Field.Root required>
					<Field.Label>予約人数</Field.Label>
					<Input placeholder="人数" />
				</Field.Root>

				<Fieldset.Root>
					<Fieldset.Legend>どこで本公演を知りましたか？</Fieldset.Legend>
					<Input placeholder="知った方法" />
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

