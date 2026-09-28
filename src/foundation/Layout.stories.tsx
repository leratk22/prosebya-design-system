import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as Blocks from "./foundation-blocks";

/**
 * Числовые токены: шкала Numbers для отступов и размеров, радиусы, тени и брейкпоинты.
 * Значения читаются из `tailwind.config.ts`.
 */
const meta = {
  title: "Foundation/Layout",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Шкала Numbers: отступы, размеры шрифтов и элементов. */
export const Numbers: Story = { render: () => <Blocks.Spacing /> };

/** Радиусы скругления. */
export const Radius: Story = { render: () => <Blocks.Radius /> };

/** Тени. */
export const Shadows: Story = { render: () => <Blocks.Shadows /> };

/** Брейкпоинты. */
export const Breakpoints: Story = { render: () => <Blocks.Breakpoints /> };
