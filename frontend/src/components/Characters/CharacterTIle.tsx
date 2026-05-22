import { Box, Image, Text, VStack } from "@chakra-ui/react";

type Props = {
  svgUrl: string;
  name: string;
  credit: string;
  children: React.ReactNode;
  team?: string;
};

export const CharacterTile = ({
  svgUrl,
  name,
  credit,
  children,
  team,
}: Props) => (
  <VStack
    align="center"
    justify="start"
    p="4"
    borderRadius="lg"
    w="full"
    h="full"
    textAlign="center"
  >
    <Box
      w="120px"
      aspectRatio={3 / 4}
      display="flex"
      alignContent="center"
      justifyContent="center"
    >
      <Image
        src={svgUrl}
        w="full"
        h="full"
        objectFit="contain"
        alt={`${name}カード`}
      />
    </Box>

    <VStack gap={0} mt="2">
      <Text fontSize="md" fontWeight="bold" color="accent.500">
        CHARACTER / {name}
      </Text>
      <Text fontSize="sm" color="whiteAlpha.900">
        役者 / {credit}
      </Text>
      {team && (
        <Text fontSize="xs" color="whiteAlpha.600">
          {team}
          <wbr />
          所属
        </Text>
      )}
    </VStack>

    <Text
      fontSize="xs"
      color="whiteAlpha.800"
      lineHeight="tall"
      mt="3"
      w={{ base: "full", md: "fit-content" }}
      fontFamily="{fonts.default}"
      textAlign={{ base: "center", md: "left" }}
      whiteSpace="unset"
      wordBreak="keep-all"
    >
      {children}
    </Text>
  </VStack>
);
