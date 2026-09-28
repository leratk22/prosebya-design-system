import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChatBubble, type ChatBubbleProps } from "./chat-bubble";
import { asset } from "../../lib/asset";

type Item = ChatBubbleProps & { uid: number };

const initial: Item[] = [
  { uid: 1, type: "message", message: "Добрый вечер! Как прошла неделя?", time: "19:02" },
  { uid: 2, type: "message", outgoing: true, status: "sent", message: "Неплохо, но в среду было тяжело", time: "19:04" },
  {
    uid: 3,
    type: "message",
    width: "max",
    message: "Понимаю. Попробуйте записать, что произошло в среду: ситуацию, эмоцию и что вы сделали после.",
    time: "19:05",
  },
  { uid: 4, type: "file", fileName: "Дневник эмоций.pdf", fileSize: "240 Кбайт", time: "19:05" },
  { uid: 5, type: "image", outgoing: true, status: "reload", imageSrc: asset("/images/chat/photo-example.jpg"), time: "19:07" },
  { uid: 6, type: "message", outgoing: true, status: "error", message: "Спасибо, попробую сегодня", time: "19:08" },
];

/**
 * Песочница чата: сообщения разных типов в одной переписке.
 * Нажмите «повторить» у сообщения с ошибкой или у изображения — статус сменится
 * на отправку и затем на «доставлено». Корзина удаляет сообщение.
 */
const meta = {
  title: "Sandboxes/Chat",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Conversation() {
  const [items, setItems] = React.useState(initial);

  const update = (uid: number, patch: Partial<Item>) =>
    setItems((list) => list.map((item) => (item.uid === uid ? { ...item, ...patch } : item)));

  const retry = (item: Item) => {
    update(item.uid, { status: item.type === "image" ? "loading" : "sending" });
    window.setTimeout(() => update(item.uid, { status: "sent" }), 1200);
  };

  return (
    <div className="flex w-375 flex-col rounded-l bg-light-bg-primary py-16 shadow-elevation">
      {items.map((item) => {
        const { uid, ...props } = item;
        return (
          <ChatBubble
            key={uid}
            {...props}
            onRetry={() => retry(item)}
            onDelete={() => setItems((list) => list.filter((i) => i.uid !== uid))}
          />
        );
      })}
      <button
        type="button"
        onClick={() => setItems(initial)}
        className="mx-16 mt-16 rounded-m bg-light-bg-secondary px-16 py-12 font-euclid text-label-m text-light-fg-primary transition-colors duration-150 hover:bg-light-bg-tertiary"
      >
        Сбросить переписку
      </button>
    </div>
  );
}

export const Chat: Story = {
  render: () => <Conversation />,
};
