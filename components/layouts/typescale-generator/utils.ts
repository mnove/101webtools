import { z } from "zod";

// Font scale options with their descriptions
export const fontScales = {
  minorSecond: {
    name: "Minor Second",
    ratio: 1.067,
    description: "Subtle increments, suitable for dense text layouts",
  },
  majorSecond: {
    name: "Major Second",
    ratio: 1.125,
    description:
      "Slightly more noticeable increments, good for compact designs",
  },
  minorThird: {
    name: "Minor Third",
    ratio: 1.2,
    description:
      "Moderate increments, helpful in differentiating text levels in UIs",
  },
  majorThird: {
    name: "Major Third",
    ratio: 1.25,
    description: "Clear increments, ideal for balanced typography hierarchies",
  },
  perfectFourth: {
    name: "Perfect Fourth",
    ratio: 1.333,
    description: "Distinct visual hierarchy, ideal for varied content types",
  },
  augmentedFourth: {
    name: "Augmented Fourth",
    ratio: 1.414,
    description: "Dramatic scale useful for making strong visual impacts",
  },
  perfectFifth: {
    name: "Perfect Fifth",
    ratio: 1.5,
    description:
      "Significant size differences, excellent for high contrast designs",
  },
  goldenRatio: {
    name: "Golden Ratio",
    ratio: 1.618,
    description: "Visually pleasing balance, often used in high-end designs",
  },
};

// Common font families to choose from
export const fontFamilies = [
  {
    name: "System UI",
    value:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  { name: "Inter", value: "Inter, system-ui, sans-serif" },
  { name: "Roboto", value: "Roboto, Arial, sans-serif" },
  { name: "Playfair Display", value: "'Playfair Display', Georgia, serif" },
  { name: "Montserrat", value: "Montserrat, Helvetica, Arial, sans-serif" },
  { name: "Open Sans", value: "'Open Sans', Arial, sans-serif" },
  { name: "Source Serif Pro", value: "'Source Serif Pro', Georgia, serif" },
  { name: "Merriweather", value: "Merriweather, Georgia, serif" },
];

// Form schema for typescale settings
export const typeScaleFormSchema = z.object({
  baseSize: z.coerce.number().min(12).max(24),
  scale: z.enum([
    "minorSecond",
    "majorSecond",
    "minorThird",
    "majorThird",
    "perfectFourth",
    "augmentedFourth",
    "perfectFifth",
    "goldenRatio",
  ]),
  fontFamily: z.string(),
  sampleText: z.string().min(1, "Sample text is required"),
  showCode: z.boolean(),
});

export type TypeScaleFormValues = z.infer<typeof typeScaleFormSchema>;

// Function to calculate font size based on scale
export const calculateSize = (
  baseSize: number,
  ratio: number,
  step: number
): number => {
  return parseFloat((baseSize * Math.pow(ratio, step)).toFixed(2));
};

// Generate CSS code for the current scale
export const generateCssCode = (
  scale: keyof typeof fontScales,
  baseSize: number,
  fontFamily: string
): string => {
  const scaleRatio = fontScales[scale].ratio;

  return `/* Font Scale: ${fontScales[scale].name} (${scaleRatio}) */
/* Base size: ${baseSize}px */

:root {
  --font-family: ${fontFamily};
  --font-small: ${calculateSize(baseSize, scaleRatio, -2)}px;
  --font-base: ${baseSize}px;
  --font-h5: ${calculateSize(baseSize, scaleRatio, 1)}px;
  --font-h4: ${calculateSize(baseSize, scaleRatio, 2)}px;
  --font-h3: ${calculateSize(baseSize, scaleRatio, 3)}px;
  --font-h2: ${calculateSize(baseSize, scaleRatio, 4)}px;
  --font-h1: ${calculateSize(baseSize, scaleRatio, 5)}px;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-base);
  line-height: 1.5;
}

small { font-size: var(--font-small); }
h5 { font-size: var(--font-h5); }
h4 { font-size: var(--font-h4); }
h3 { font-size: var(--font-h3); }
h2 { font-size: var(--font-h2); }
h1 { font-size: var(--font-h1); }`;
};
