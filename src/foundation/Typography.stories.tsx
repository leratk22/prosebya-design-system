import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as Blocks from "./foundation-blocks";
import type { TypeMode } from "../tokens/typography";

/**
 * Типографика из Figma «Макеты для разработки (mobile)»: 31 текстовый стиль группы MVP2.0,
 * шрифт Euclid Circular A. Значения читаются из `src/tokens/typography.ts`.
 *
 * Размер и высота строки меняются по ширине экрана (коллекция Layout в Figma):
 * до 360 px — режим 320, от 360 px — 375, от 430 px — 430. Классы `text-*` делают это сами.
 */
type Args = { sample: string; mode: TypeMode };

const meta: Meta<Args> = {
  title: "Foundation/Typography",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    sample: "Как вы себя чувствуете сегодня?",
    mode: "375",
  },
  argTypes: {
    sample: { control: "text", description: "Текст примера" },
    mode: {
      control: "inline-radio",
      options: ["320", "375", "430"],
      description: "Ширина экрана, для которой показаны размеры в примерах",
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

/** Все текстовые стили строками-примерами. Ширина экрана переключается в панели Controls. */
export const TextStyles: Story = {
  name: "Text styles",
  render: (args) => <Blocks.TextStyles sample={args.sample} mode={args.mode} />,
};

/** Начертания шрифта и курсивы. */
export const Weights: Story = {
  render: (args) => <Blocks.FontWeights sample={args.sample} />,
};
