import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as Blocks from "./foundation-blocks";

/**
 * Типографика из Figma «Макеты для разработки (mobile)»: 31 текстовый стиль группы MVP2.0,
 * шрифт Euclid Circular A. Значения читаются из `src/tokens/typography.ts`.

 */
type Args = { sample: string };

const meta: Meta<Args> = {
  title: "Foundation/Typography",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    sample: "Как вы себя чувствуете сегодня?",
  },
  argTypes: {
    sample: { control: "text", description: "Текст примера" },
  },
};

export default meta;
type Story = StoryObj<Args>;

/** Все текстовые стили строками-примерами. */
export const TextStyles: Story = {
  name: "Text styles",
  render: (args) => <Blocks.TextStyles sample={args.sample} />,
};

/** Начертания шрифта и курсивы. */
export const Weights: Story = {
  render: (args) => <Blocks.FontWeights sample={args.sample} />,
};
