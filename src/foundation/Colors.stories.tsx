import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PrimitiveColors, SemanticColors } from "./foundation-blocks";

/**
 * Цвета дизайн-системы. Значения читаются из `tailwind.config.ts`.
 *
 * **Primitive** — глобальная палитра: бренд, основной цвет и его прозрачности, серые, системные, обратная связь.
 * В компонентах напрямую не используются.
 *
 * **Semantic** — цвета по назначению для светлой и тёмной темы: фоны, текст, границы.
 * Стрелкой указан примитив с тем же значением. В компонентах используются только они.
 */
const meta = {
  title: "Foundation/Colors",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Глобальная палитра: имя токена и значение. */
export const Primitive: Story = {
  render: () => <PrimitiveColors />,
};

/** Смысловые токены светлой темы. Классы вида `bg-light-bg-primary`. */
export const SemanticLight: Story = {
  name: "Semantic · Light",
  render: () => <SemanticColors theme="light" />,
};

/** Смысловые токены тёмной темы. Классы вида `dark:bg-dark-bg-primary`. */
export const SemanticDark: Story = {
  name: "Semantic · Dark",
  render: () => <SemanticColors theme="dark" />,
};
