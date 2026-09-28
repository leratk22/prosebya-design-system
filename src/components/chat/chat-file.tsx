"use client";

import * as React from "react";
import { asset } from "../../lib/asset";

export type ChatFileState = "uploaded" | "loading" | "reload";
export type ChatFileTone = "brand" | "neutral";

export interface ChatFileProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Состояние вложения согласно Figma: State = Uploaded / Loading / Reload
   */
  state?: ChatFileState;
  /**
   * Подложка иконки: brand — во входящем сообщении, neutral — в исходящем.
   * В состоянии reload подложка всегда нейтральная.
   */
  tone?: ChatFileTone;
  /** Имя файла */
  name: string;
  /** Размер файла, например «10 Кбайт» */
  size: string;
  /** Нажатие на иконку: скачать (uploaded) или загрузить повторно (reload) */
  onIconClick?: () => void;
}

/**
 * Вложение в сообщении чата: иконка действия, имя и размер файла.
 *
 * @figma https://www.figma.com/design/Gr1ERrSAzB6n2xWAV5ECiu/?node-id=36911-24544
 */
export const ChatFile = React.forwardRef<HTMLDivElement, ChatFileProps>(
  (
    {
      state = "uploaded",
      tone = "brand",
      name,
      size,
      onIconClick,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const iconBg =
      state === "reload" || tone === "neutral"
        ? "bg-light-bg-overlay-dark"
        : "bg-light-bg-accent-brand-overlay";

    const icon =
      state === "loading" ? (
        <img src={asset("/icons/chat/loader-24.svg")} alt="" width={24} height={24} className="animate-spin" />
      ) : state === "reload" ? (
        <img src={asset("/icons/chat/reload-24-negative.svg")} alt="" width={24} height={24} />
      ) : (
        <img src={asset("/icons/chat/download-24.svg")} alt="" width={24} height={24} />
      );

    const iconLabel =
      state === "loading" ? "Файл загружается" : state === "reload" ? "Загрузить повторно" : "Скачать файл";

    return (
      <div
        ref={ref}
        className={["flex items-center gap-8", className].filter(Boolean).join(" ")}
        {...rest}
      >
        <button
          type="button"
          onClick={onIconClick}
          disabled={state === "loading"}
          aria-label={iconLabel}
          className={[
            "flex shrink-0 items-center justify-center p-12 rounded-s",
            "transition-[filter,transform] duration-150 ease-out",
            "enabled:hover:brightness-95 enabled:active:scale-95",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border-accent",
            "disabled:cursor-default",
            iconBg,
          ].join(" ")}
        >
          {icon}
        </button>
        <div className="flex min-w-0 flex-1 flex-col gap-2 font-euclid text-body-l-regular">
          <span className="truncate text-light-fg-primary">{name}</span>
          <span className="text-light-fg-secondary">{size}</span>
        </div>
      </div>
    );
  },
);

ChatFile.displayName = "ChatFile";

export default ChatFile;
