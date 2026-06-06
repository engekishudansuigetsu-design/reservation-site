import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineSlotRecipe,
} from "@chakra-ui/react";

// fontsixze sm 12, md 14 lg 16

const config = defineConfig({
  globalCss: {
    "html, body": {
      bg: "#140a00",
      color: "white",
      fontFamily: "{fonts.default}",
      overflowX: "hidden",
    },
  },

  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#ffebeb" },
          100: { value: "#ffd4d4" },
          200: { value: "#ffa8a8" },
          300: { value: "#ff7070" },
          400: { value: "#ff3838" },
          500: { value: "#B00000" }, // メインの赤
          600: { value: "#8A0000" },
          700: { value: "#660000" },
          800: { value: "#420000" },
          900: { value: "#210000" },
        },
        accent: {
          50: { value: "#fff8ed" },
          100: { value: "#f5dfb8" },
          200: { value: "#ebc27e" },
          300: { value: "#dfa24d" },
          400: { value: "#d49138" },
          500: { value: "#cf8c2f" }, // アクセントの黄色
          600: { value: "#ae6f16" },
          700: { value: "#87540f" },
          800: { value: "#5c3808" },
          900: { value: "#301d03" },
        },
      },
      fonts: {
        title: { value: '"Hina Mincho", serif' },
        default: { value: '"Zen Maru Gothic", sans-serif' },
      },
      zIndex: {
        fab: { value: "300" },
        header: { value: "100" },

        title: { value: "50" },
        flyerKurage: { value: "10" },
        flyerKurageGlow: { value: "9" },
        content: { value: "5" },

        backgroundBaseWrapper: { value: "3" },
        backgroundBG: { value: "1" },
        backgroundNoise: { value: "2" },
      },
    },

    semanticTokens: {
      colors: {
        accent: {
          solid: {
            value: "{colors.accent.500}",
          },

          contrast: {
            value: "white",
          },

          fg: {
            value: "{colors.accent.200}",
          },

          muted: {
            value: "{colors.accent.100}",
          },

          subtle: {
            value: "{colors.accent.200}",
          },

          emphasized: {
            value: "{colors.accent.300}",
          },

          focusRing: {
            value: "{colors.accent.500}",
          },
        },

        brand: {
          solid: {
            value: "{colors.brand.500}",
          },

          contrast: {
            value: "white",
          },

          fg: {
            value: "{colors.brand.200}",
          },

          muted: {
            value: "{colors.brand.100}",
          },

          subtle: {
            value: "{colors.brand.200}",
          },

          emphasized: {
            value: "{colors.brand.300}",
          },

          focusRing: {
            value: "{colors.brand.500}",
          },
        },
      },
    },

    recipes: {
      button: defineRecipe({
        base: {
          borderRadius: "md",
          fontFamily: "{fonts.default}",
        },
        variants: {
          variant: {
            solid: {
              bg: "colorPalette.500",
              color: "white",
              _hover: {
                bg: "colorPalette.600",
              },
              _active: {
                bg: "colorPalette.600",
              },
              _expanded: {
                bg: "colorPalette.600",
              },
            },
          },
        },
      }),
      text: defineRecipe({
        base: {
          fontFamily: "{fonts.default}",
          color: "white",
        },
      }),
      input: defineRecipe({
        base: {
          color: "white",
          fontFamily: "{fonts.default}",
          _placeholder: {
            color: "whiteAlpha.600",
          },
        },
      }),
      textarea: defineRecipe({
        base: {
          color: "white",
          fontFamily: "{fonts.default}",
          _placeholder: {
            color: "whiteAlpha.600",
          },
        },
      }),
    },

    slotRecipes: {
      field: defineSlotRecipe({
        className: "field",
        slots: [
          "root",
          "label",
          "helperText",
          "errorText",
          "requiredIndicator",
        ],
        base: {
          label: { color: "white", fontFamily: "{fonts.default}" },
          helperText: {
            color: "whiteAlpha.800",
            fontFamily: "{fonts.default}",
          },
          errorText: { fontFamily: "{fonts.default}" },
        },
      }),
      fieldset: defineSlotRecipe({
        className: "fieldset",
        slots: ["root", "legend", "content", "helperText", "errorText"],
        base: {
          legend: {
            color: "white",
            fontFamily: "{fonts.default}",
            fontWeight: "bold",
          },
        },
      }),
      checkbox: defineSlotRecipe({
        className: "checkbox",
        slots: ["root", "control", "label", "indicator"],
        base: {
          control: {
            borderColor: "whiteAlpha.400",
          },
          indicator: {
            color: "white",
          },

          label: { color: "white", fontFamily: "{fonts.default}" },
        },
      }),
      nativeSelect: defineSlotRecipe({
        className: "nativeSelect",
        slots: ["root", "field", "indicator"],
        base: {
          field: {
            fontFamily: "{fonts.default}",
            _placeholder: { color: "whiteAlpha.600" },
          },
        },
      }),
    },
  },
});

export const system = createSystem(defaultConfig, config);
