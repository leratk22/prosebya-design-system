"use client";

import * as React from "react";
import { ChatFile } from "./chat-file";

export type ChatBubbleType = "message" | "file" | "image";
export type ChatBubbleWidth = "compact" | "max";
export type ChatBubbleStatus = "sent" | "sending" | "error" | "loading" | "reload";

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Формат сообщения согласно Figma: Type = Message / File / Image */
  type?: ChatBubbleType;
  /**
   * Ширина текстового сообщения: compact — по содержимому, max — на всю доступную ширину.
   * Файлы и изображения всегда по содержимому.
   */
  width?: ChatBubbleWidth;
  /** Исходящее сообщение (Outgoing = on) — выравнивается справа */
  outgoing?: boolean;
  /**
   * Статус. sent / sending / error — для исходящих.
   * loading / reload — только для изображений (входящих и исходящих).
   */
  status?: ChatBubbleStatus;
  /** Текст сообщения (type = message) */
  message?: React.ReactNode;
  /** Время отправки */
  time?: string;
  /** Имя файла (type = file) */
  fileName?: string;
  /** Размер файла (type = file) */
  fileSize?: string;
  /** Адрес изображения (type = image) */
  imageSrc?: string;
  /** Альтернативный текст изображения */
  imageAlt?: string;
  /** Показать причину ошибки */
  onInfo?: () => void;
  /** Удалить неотправленное сообщение */
  onDelete?: () => void;
  /** Отправить повторно (status = error) или загрузить повторно (status = reload) */
  onRetry?: () => void;
  /** Нажатие на иконку файла */
  onFileClick?: () => void;
}

const actionButtonClasses = [
  "flex size-24 items-center justify-center rounded-full",
  "transition-[opacity,transform] duration-150 ease-out",
  "hover:opacity-70 active:scale-90",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border-accent",
].join(" ");

function ErrorActions({ onInfo, onDelete, onRetry }: Pick<ChatBubbleProps, "onInfo" | "onDelete" | "onRetry">) {
  return (
    <div className="flex shrink-0 items-center justify-end gap-8">
      <button type="button" className={actionButtonClasses} onClick={onInfo} aria-label="Подробнее об ошибке">
        <img src="/icons/chat/info-24.svg" alt="" width={24} height={24} />
      </button>
      <button type="button" className={actionButtonClasses} onClick={onDelete} aria-label="Удалить сообщение">
        <img src="/icons/chat/trash-24.svg" alt="" width={24} height={24} />
      </button>
      <button type="button" className={actionButtonClasses} onClick={onRetry} aria-label="Отправить повторно">
        <img src="/icons/chat/reload-24.svg" alt="" width={24} height={24} />
      </button>
    </div>
  );
}

/** Время и статус доставки под текстом или файлом. */
function Meta({ time, outgoing, status }: Pick<ChatBubbleProps, "time" | "outgoing" | "status">) {
  if (outgoing && status === "sending") {
    return <img src="/icons/chat/clock-16.svg" alt="Отправляется" width={16} height={16} className="opacity-60" />;
  }
  return (
    <div className="flex items-center gap-4 rounded-[4px]">
      <span className="font-euclid text-body-s text-light-fg-tertiary text-right whitespace-nowrap">{time}</span>
      {outgoing && status === "sent" && (
        <img src="/icons/chat/read-16.svg" alt="Доставлено" width={16} height={16} className="opacity-60" />
      )}
    </div>
  );
}

/**
 * Сообщение в чате: текст, файл или изображение, входящее или исходящее,
 * со статусами отправки. При ошибке рядом появляются действия: подробнее, удалить, повторить.
 *
 * @figma https://www.figma.com/design/Gr1ERrSAzB6n2xWAV5ECiu/?node-id=36911-24126
 */
export const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  (
    {
      type = "message",
      width = "compact",
      outgoing = false,
      status,
      message,
      time = "12:29",
      fileName = "file.jpg",
      fileSize = "10 Кбайт",
      imageSrc,
      imageAlt = "",
      onInfo,
      onDelete,
      onRetry,
      onFileClick,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const isError = outgoing && status === "error";
    // Хвостик бабла — острый нижний угол со стороны отправителя
    const bubbleCorners = outgoing
      ? "rounded-tl-m rounded-tr-m rounded-bl-m"
      : "rounded-tl-m rounded-tr-m rounded-br-m";
    const bubbleBg = outgoing ? "bg-light-bg-secondary" : "bg-light-bg-accent-brand-overlay-light";

    const isWideMessage = type === "message" && width === "max";
    // Свободное поле со стороны собеседника
    const gutter =
      type === "image" ? "" : type === "message" && width === "compact" ? (outgoing ? "pl-96" : "pr-96") : outgoing ? "pl-56" : "pr-56";

    let bubble: React.ReactNode;

    if (type === "image") {
      const imageCorners = outgoing
        ? "rounded-tl-l rounded-tr-l rounded-bl-l"
        : "rounded-tl-l rounded-tr-l rounded-br-l";
      const hasImage = Boolean(imageSrc) && status !== "loading" && status !== "reload";
      const showTime = !isError;

      bubble = (
        <div
          className={[
            "relative size-[232px] shrink-0 overflow-hidden",
            imageCorners,
            hasImage ? "" : "bg-light-bg-secondary",
          ].join(" ")}
        >
          {hasImage && (
            <>
              <img src={imageSrc} alt={imageAlt} className="absolute inset-0 size-full object-cover" />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(134.81deg, rgba(0, 0, 0, 0.06) 13.8%, rgba(35, 31, 32, 0.03) 79.1%)",
                }}
              />
            </>
          )}
          {status === "loading" && (
            <img
              src="/icons/chat/loader-24.svg"
              alt="Изображение загружается"
              width={24}
              height={24}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin"
            />
          )}
          {status === "reload" && (
            <button
              type="button"
              onClick={onRetry}
              aria-label="Загрузить повторно"
              className={[
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                "flex size-48 items-center justify-center rounded-xl bg-light-bg-feedback-negative-overlay",
                "transition-[filter,transform] duration-150 ease-out hover:brightness-95 active:scale-95",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border-accent",
              ].join(" ")}
            >
              <img src="/icons/chat/reload-24-negative.svg" alt="" width={24} height={24} />
            </button>
          )}
          {showTime && (
            <div className="absolute bottom-6 right-6 flex items-center gap-4 rounded-m bg-light-fg-muted px-4 py-1">
              {outgoing && status === "sending" ? (
                <img src="/icons/chat/clock-16-inverted.svg" alt="Отправляется" width={16} height={16} />
              ) : (
                <span className="w-32 text-center font-euclid text-body-s text-light-fg-inverted-secondary">{time}</span>
              )}
            </div>
          )}
        </div>
      );
    } else {
      const padding =
        type === "file" ? "pt-12 px-12 pb-4" : isError ? "pt-12 px-16 pb-20" : "pt-12 pl-16 pr-12 pb-4";

      bubble = (
        <div
          className={[
            "flex flex-col items-end transition-colors duration-200 ease-out",
            padding,
            bubbleCorners,
            bubbleBg,
            isWideMessage ? "w-full" : "",
          ].join(" ")}
        >
          {type === "file" ? (
            <ChatFile
              name={fileName}
              size={fileSize}
              tone={outgoing ? "neutral" : "brand"}
              onIconClick={onFileClick}
              className="min-w-[156px]"
            />
          ) : (
            <div className={["flex items-end pr-4", isWideMessage ? "w-full" : ""].join(" ")}>
              <p className="flex-1 font-euclid text-body-xl text-light-fg-primary break-words whitespace-pre-line">
                {message}
              </p>
            </div>
          )}
          {!isError && <Meta time={time} outgoing={outgoing} status={status} />}
        </div>
      );
    }

    // Ошибка у широкого сообщения — действия под баблом, в остальных случаях — сбоку
    const stackActions = isError && isWideMessage;

    return (
      <div
        ref={ref}
        className={[
          "flex w-full py-4",
          outgoing ? "pr-16" : "pl-16",
          gutter,
          stackActions ? "flex-col items-end" : "items-end gap-16",
          outgoing ? "justify-end" : "justify-start",
          className,
        ].join(" ")}
        {...rest}
      >
        {bubble}
        {isError && <ErrorActions onInfo={onInfo} onDelete={onDelete} onRetry={onRetry} />}
      </div>
    );
  },
);

ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
