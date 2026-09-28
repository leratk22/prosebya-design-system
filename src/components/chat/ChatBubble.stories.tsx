import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChatBubble } from "./chat-bubble";

const PHOTO = "/images/chat/photo-example.jpg";

/**
 * Сообщение в чате. Поддерживает короткий и длинный текст, файлы и изображения,
 * входящие и исходящие сообщения и статусы отправки.
 *
 * **Когда использовать:** отдельные сообщения в чатах — реплики, вложения, изображения.
 * Входящие — слева на брендовой подложке, исходящие — справа на нейтральной.
 *
 * **Когда не использовать:** системные события, разделители дат, индикатор набора текста, поле ввода.
 */
const meta = {
  title: "Chat/ChatBubble",
  component: ChatBubble,
  tags: ["autodocs"],
  args: {
    type: "message",
    width: "compact",
    outgoing: false,
    message: "Добрый вечер! Как прошла неделя?",
    time: "12:29",
    fileName: "Дневник эмоций.pdf",
    fileSize: "240 Кбайт",
    imageSrc: PHOTO,
  },
  argTypes: {
    type: { control: "inline-radio", options: ["message", "file", "image"] },
    width: { control: "inline-radio", options: ["compact", "max"] },
    outgoing: { control: "boolean" },
    status: { control: "select", options: [undefined, "sent", "sending", "error", "loading", "reload"] },
    message: { control: "text" },
    time: { control: "text" },
    fileName: { control: "text" },
    fileSize: { control: "text" },
    imageSrc: { control: "text" },
    imageAlt: { control: "text" },
    onInfo: { action: "info" },
    onDelete: { action: "delete" },
    onRetry: { action: "retry" },
    onFileClick: { action: "file click" },
  },
  parameters: { layout: "fullscreen" },
  decorators: [
    // Рамка ширины телефона; матрица вариантов отключает её через parameters.phoneFrame
    (Story, { parameters }) =>
      parameters.phoneFrame === false ? (
        <Story />
      ) : (
        <div className="w-full max-w-375 bg-light-bg-primary py-16">
          <Story />
        </div>
      ),
  ],
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Входящее короткое сообщение — слева, на брендовой подложке. */
export const Incoming: Story = {};

/** Исходящее сообщение, доставлено. */
export const OutgoingSent: Story = {
  args: { outgoing: true, status: "sent", message: "Спасибо, уже лучше" },
};

/** Исходящее сообщение в процессе отправки — вместо времени часы. */
export const OutgoingSending: Story = {
  args: { outgoing: true, status: "sending", message: "Спасибо, уже лучше" },
};

/** Ошибка отправки — рядом действия: подробнее, удалить, повторить. */
export const OutgoingError: Story = {
  args: { outgoing: true, status: "error", message: "Спасибо, уже лучше" },
};

/** Длинный текст на всю ширину. */
export const LongMessage: Story = {
  args: {
    width: "max",
    message:
      "Попробуйте вечером записать три ситуации, которые вызвали сильные эмоции. Рядом отметьте, что вы почувствовали и что сделали после.",
  },
};

/** Длинное исходящее сообщение с ошибкой — действия под баблом. */
export const LongMessageError: Story = {
  args: {
    width: "max",
    outgoing: true,
    status: "error",
    message: "Хорошо, попробую сегодня. А если ситуаций было больше трёх — записывать все?",
  },
};

/** Файл во входящем сообщении. */
export const FileIncoming: Story = { args: { type: "file" } };

/** Файл в исходящем сообщении. */
export const FileOutgoing: Story = { args: { type: "file", outgoing: true, status: "sent" } };

/** Изображение, исходящее. */
export const Image: Story = { args: { type: "image", outgoing: true, status: "sent" } };

/** Изображение загружается. */
export const ImageLoading: Story = { args: { type: "image", outgoing: true, status: "loading" } };

/** Изображение не загрузилось — кнопка повторной загрузки. */
export const ImageReload: Story = { args: { type: "image", outgoing: true, status: "reload" } };

const outgoingStatuses = ["sent", "sending", "error"] as const;

/** Матрица Type × Direction × Status — все варианты из Figma рядом. */
export const AllVariants: Story = {
  parameters: { layout: "padded", phoneFrame: false },
  render: (args) => (
    <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
      {(["message", "file", "image"] as const).map((type) => (
        <section key={type} className="rounded-m bg-light-bg-primary py-16 lg:col-span-2">
          <h3 className="px-16 pb-8 font-euclid text-title-s text-light-fg-primary">Type = {type}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="max-w-375">
              <p className="px-16 font-euclid text-body-s-regular text-light-fg-tertiary">Входящие</p>
              <ChatBubble {...args} type={type} outgoing={false} status={undefined} />
              {type === "message" && <ChatBubble {...args} type={type} width="max" outgoing={false} status={undefined} />}
              {type === "image" && (
                <>
                  <ChatBubble {...args} type={type} outgoing={false} status="loading" />
                  <ChatBubble {...args} type={type} outgoing={false} status="reload" />
                </>
              )}
            </div>
            <div className="max-w-375">
              <p className="px-16 font-euclid text-body-s-regular text-light-fg-tertiary">Исходящие</p>
              {outgoingStatuses.map((status) => (
                <ChatBubble key={status} {...args} type={type} outgoing status={status} />
              ))}
              {type === "message" &&
                outgoingStatuses.map((status) => (
                  <ChatBubble key={`max-${status}`} {...args} type={type} width="max" outgoing status={status} />
                ))}
              {type === "image" && (
                <>
                  <ChatBubble {...args} type={type} outgoing status="loading" />
                  <ChatBubble {...args} type={type} outgoing status="reload" />
                </>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  ),
};
