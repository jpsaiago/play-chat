// uno.config.ts
import { defineConfig, presetIcons, presetWind } from "unocss";
import presetWebFonts from "@unocss/preset-web-fonts";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons(),
    presetWebFonts({
      provider: "google",
      fonts: {
        poppins: "Poppins",
        inter: "Inter",
      },
    }),
  ],
  transformers: [transformerVariantGroup()],
});
