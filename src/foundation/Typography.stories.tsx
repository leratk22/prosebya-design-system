import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as Blocks from "./foundation-blocks";
import type { Weight } from "./foundation-blocks";

/**
 * Типографика: шрифт Euclid Circular A, текстовые стили, насыщенности, высота строки и трекинг.
 * Значения читаются из `tailwind.config.ts`.
 */
type Args = { sample: string; weight: Weight };

const meta: Meta<Args> = {
  title: "Foundation/Typography",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    sample: "Как вы себя чувствуете сегодня?",
    weight: "regular",
  },
  argTypes: {
    sample: { control: "text", description: "Текст примера" },
    weight: {
      control: "inline-radio",
      options: ["light", "regular", "medium", "semibold", "bold"],
      description: "Насыщенность для примеров текстовых стилей",
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

/** Каждый текстовый стиль строкой-примером. Насыщенность меняется в панели Controls. */
export const TextStyles: Story = {
  name: "Text styles",
  render: (args) => <Blocks.TextStyles sample={args.sample} weight={args.weight} />,
};

/** Насыщенности шрифта, высота строки и трекинг. */
export const Weights: Story = {
  name: "Weights, leading, tracking",
  render: (args) => <Blocks.FontWeights sample={args.sample} />,
};
