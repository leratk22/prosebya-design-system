import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChatFile } from "./chat-file";

/**
 * Вложение внутри сообщения чата: иконка действия, имя и размер файла.
 * Используется внутри `ChatBubble` с `type="file"`.
 */
const meta = {
  title: "Chat/ChatFile",
  component: ChatFile,
  tags: ["autodocs"],
  args: {
    state: "uploaded",
    tone: "brand",
    name: "Дневник эмоций.pdf",
    size: "240 Кбайт",
  },
  argTypes: {
    state: { control: "inline-radio", options: ["uploaded", "loading", "reload"] },
    tone: { control: "inline-radio", options: ["brand", "neutral"] },
    name: { control: "text" },
    size: { control: "text" },
    onIconClick: { action: "icon click" },
  },
  parameters: { layout: "centered" },
  decorators: [
    (Story, { parameters }) =>
      parameters.phoneFrame === false ? (
        <Story />
      ) : (
        <div className="w-[267px]">
          <Story />
        </div>
      ),
  ],
} satisfies Meta<typeof ChatFile>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Файл загружен — можно скачать. */
export const Uploaded: Story = {};

/** Файл загружается. */
export const Loading: Story = { args: { state: "loading" } };

/** Загрузка не удалась — можно повторить. */
export const Reload: Story = { args: { state: "reload" } };

/** Нейтральная подложка — для исходящих сообщений. */
export const Neutral: Story = { args: { tone: "neutral" } };

/** Все состояния × подложки. */
export const AllVariants: Story = {
  parameters: { layout: "padded", phoneFrame: false },
  render: (args) => (
    <div className="flex flex-wrap gap-32">
      {(["brand", "neutral"] as const).map((tone) => (
        <div key={tone} className="flex w-[267px] flex-col gap-16">
          <p className="font-euclid text-body-s text-light-fg-tertiary">tone = {tone}</p>
          {(["uploaded", "loading", "reload"] as const).map((state) => (
            <ChatFile key={state} {...args} tone={tone} state={state} />
          ))}
        </div>
      ))}
    </div>
  ),
};
