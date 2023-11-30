// uno.config.ts
import { defineConfig, presetIcons, presetWind, presetWebFonts } from "unocss";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default defineConfig({
  presets: [presetWind(), presetIcons(), presetWebFonts()],
  transformers: [transformerVariantGroup()],
});
