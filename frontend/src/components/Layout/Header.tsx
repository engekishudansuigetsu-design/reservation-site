import { Flex, IconButton, Menu, Portal } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { SECTION_IDS, HEADERHEIGHT, MENUITEMS } from "../../const";

export const Header = () => {
	const handleClick = (id: (typeof MENUITEMS)[number]['id']) => {
		const target = document.getElementById(id);

		// もしtargetが見つからない場合は、ページのトップにスクロールする
		if (!target) return;

		// あらすじセクションの場合は、ページのトップにスクロールする
		// それ以外のセクションの場合は、該当のセクションにスクロールする
		target.scrollIntoView({
			behavior: "smooth",
			...(id === SECTION_IDS.introduction ? { top: 0 } : { block: "start" }),
		});
	};

	return (
		<Flex
			w="100%"
			h={HEADERHEIGHT}
			maxW="container.lg"
			mx="auto"
			px={4}
			position="sticky"
			top={0}
			zIndex={100}
			bg="#B00000"
			align="center"
			justify="flex-end"
		>
			<Menu.Root>
				<Menu.Trigger asChild>
					<IconButton aria-label="menu" variant="ghost" color="white">
						<RxHamburgerMenu />
					</IconButton>
				</Menu.Trigger>

				<Portal>
					<Menu.Positioner>
						<Menu.Content>
							{MENUITEMS.map((item) => (
								<Menu.Item
									key={item.id}
									value={item.id}
									onClick={() => handleClick(item.id)}
								>
									{item.label}
								</Menu.Item>
							))}
						</Menu.Content>
					</Menu.Positioner>
				</Portal>
			</Menu.Root>
		</Flex>
	);
};