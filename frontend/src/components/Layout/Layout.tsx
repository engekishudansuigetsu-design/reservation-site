import React from 'react';
import { Header } from './Header';
import { Box, Container } from '@chakra-ui/react';

export const Layout = (props: { children: React.ReactNode }) => {
	return (
		<Box>
			<Header />
			<Container maxW="container.lg" mt={4}>
				{props.children}
			</Container>
		</Box>
	);
}