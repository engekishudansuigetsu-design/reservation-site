import { Box, Flex, IconButton } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";

export const Header = () => {
    return (
        <Box position="sticky" top={0} zIndex={100} bg="#B00000" w="100%">
            <Flex maxW="container.lg" mx="auto" px={4} h="60px" align="center" justify="flex-end">
                <IconButton aria-label="menu" variant="ghost" color="white" onClick={() => handleClick("menu")}>
                    <RxHamburgerMenu />
                </IconButton>
            </Flex>
        </Box>
    );
};