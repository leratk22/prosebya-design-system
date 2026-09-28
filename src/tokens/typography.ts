/**
 * Текстовые стили из Figma «Макеты для разработки (mobile)», группа MVP2.0.
 *
 * Значения для 375 взяты из текстовых стилей Figma. Для 320 и 430 — из коллекции
 * переменных Layout (режимы 320 / 360 / 375 / 430; 360 в Figma совпадает с 375).
 * Если стиль и переменная расходятся, прав стиль.
 *
 * Отсюда tailwind.config.ts собирает классы `text-*`, а Storybook — раздел Foundation.
 */

/** Брейкпоинты режимов Layout. Режим действует от своей ширины и до следующего. */
export const TYPE_BREAKPOINTS = {
  "320": 0,
  "375": 360,
  "430": 430,
} as const;

export type TypeMode = keyof typeof TYPE_BREAKPOINTS;

export interface TextMetrics {
  size: number;
  lineHeight: number;
}

export interface TextStyleToken {
  /** Имя класса без префикса: `title-xl` → `text-title-xl` */
  name: string;
  /** Имя стиля в Figma */
  figma: string;
  weight: 400 | 500 | 600;
  italic?: boolean;
  underline?: boolean;
  uppercase?: boolean;
  /** Цифры одинаковой ширины (Numbers) */
  tabularNums?: boolean;
  /** Трекинг в em: −2% в Figma = −0.02em */
  letterSpacing: number;
  /** Отступ между абзацами, px */
  paragraphSpacing?: number;
  metrics: Record<TypeMode, TextMetrics>;
  /** Где используется — из описания в Figma */
  usage?: string;
}

const m = (s320: number, lh320: number, s375: number, lh375: number, s430: number, lh430: number) => ({
  "320": { size: s320, lineHeight: lh320 },
  "375": { size: s375, lineHeight: lh375 },
  "430": { size: s430, lineHeight: lh430 },
});

// Размеры по группам: 320 / 375 / 430
const TITLE_XL = m(24, 28, 28, 32, 32, 36);
const TITLE_L = m(20, 24, 24, 28, 28, 32);
const TITLE_M = m(16, 20, 20, 24, 24, 28);
const TITLE_S = m(14, 16, 16, 20, 20, 24);
const BODY_XL = m(16, 24, 20, 28, 24, 32);
const BODY_L = m(14, 20, 16, 24, 20, 28);
const BODY_M = m(12, 16, 14, 20, 18, 24);
const BODY_S = m(12, 16, 12, 16, 16, 20);
const CONTENT_L = m(14, 20, 16, 24, 20, 28);
const LABEL_L = m(14, 20, 16, 24, 20, 28);
const LABEL_M = m(12, 16, 14, 20, 18, 24);
const LABEL_S = m(10, 12, 12, 16, 16, 20);
const LABEL_XS = m(10, 12, 10, 12, 10, 12);
const NUMBER_L = m(14, 20, 16, 24, 20, 28);
const NUMBER_S = m(10, 12, 12, 16, 16, 20);
const CAPTION_S = m(10, 12, 12, 16, 16, 20);

const TITLE_USAGE = "Заголовки страниц и блоков";
const DECORATIVE_USAGE = "Акцент на одном-двух словах заголовка, только вместе с обычным Title. Цвет — FG/Tertiary";
const BODY_USAGE = "Основной текст интерфейса, карточек и текстовых блоков";
const LABEL_USAGE = "Только кнопки и активные элементы. Не для заголовков и наборного текста";
const CONTENT_USAGE = "Только статьи: Body с увеличенным отступом между абзацами";

export const textStyles: TextStyleToken[] = [
  { name: "title-xl-decorative", figma: "Title/XL-Decorative", weight: 600, italic: true, letterSpacing: -0.02, metrics: TITLE_XL, usage: DECORATIVE_USAGE },
  { name: "title-xl", figma: "Title/XL", weight: 600, letterSpacing: -0.02, metrics: TITLE_XL, usage: TITLE_USAGE },
  { name: "title-l-decorative", figma: "Title/L-Decorative", weight: 600, italic: true, letterSpacing: -0.015, metrics: TITLE_L, usage: DECORATIVE_USAGE },
  // В стиле Title/L высота строки 32, в переменной Layout — 28. Прав стиль.
  { name: "title-l", figma: "Title/L", weight: 600, letterSpacing: -0.015, metrics: { ...TITLE_L, "375": { size: 24, lineHeight: 32 } }, usage: TITLE_USAGE },
  { name: "title-m-decorative", figma: "Title/M-Decorative", weight: 600, italic: true, letterSpacing: -0.01, metrics: TITLE_M, usage: DECORATIVE_USAGE },
  { name: "title-m", figma: "Title/M", weight: 600, letterSpacing: -0.01, metrics: TITLE_M, usage: TITLE_USAGE },
  { name: "title-s-decorative", figma: "Title/S-Decorative", weight: 600, italic: true, letterSpacing: 0, metrics: TITLE_S, usage: DECORATIVE_USAGE },
  { name: "title-s", figma: "Title/S", weight: 600, letterSpacing: 0, metrics: TITLE_S, usage: TITLE_USAGE },

  { name: "body-xl-medium", figma: "Body/XL-Medium", weight: 500, letterSpacing: 0, metrics: BODY_XL, usage: BODY_USAGE },
  { name: "body-xl-regular", figma: "Body/XL-Regular", weight: 400, letterSpacing: 0, metrics: BODY_XL, usage: BODY_USAGE },
  { name: "body-l-medium", figma: "Body/L-Medium", weight: 500, letterSpacing: 0, metrics: BODY_L, usage: BODY_USAGE },
  { name: "body-l-regular", figma: "Body/L-Regular", weight: 400, letterSpacing: 0, metrics: BODY_L, usage: BODY_USAGE },
  { name: "body-m-medium", figma: "Body/M-Medium", weight: 500, letterSpacing: 0, metrics: BODY_M, usage: BODY_USAGE },
  { name: "body-m-regular", figma: "Body/M-Regular", weight: 400, letterSpacing: 0, metrics: BODY_M, usage: BODY_USAGE },
  { name: "body-s-medium", figma: "Body/S-Medium", weight: 500, letterSpacing: 0, metrics: BODY_S, usage: BODY_USAGE },
  { name: "body-s-regular", figma: "Body/S-Regular", weight: 400, letterSpacing: 0, metrics: BODY_S, usage: BODY_USAGE },

  { name: "label-l", figma: "Label/L", weight: 600, letterSpacing: 0, metrics: LABEL_L, usage: LABEL_USAGE },
  { name: "label-m", figma: "Label/M", weight: 600, letterSpacing: 0, metrics: LABEL_M, usage: LABEL_USAGE },
  { name: "label-s", figma: "Label/S", weight: 600, letterSpacing: 0, metrics: LABEL_S, usage: LABEL_USAGE },
  { name: "label-xs", figma: "Label/XS", weight: 500, letterSpacing: 0, metrics: LABEL_XS, usage: LABEL_USAGE },

  { name: "content-l-regular", figma: "Content/Body/L-Regular", weight: 400, letterSpacing: 0, paragraphSpacing: 8, metrics: CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-italic", figma: "Content/Body/L-Italic", weight: 500, italic: true, letterSpacing: 0, paragraphSpacing: 8, metrics: CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-underline", figma: "Content/Body/L-Underline", weight: 400, underline: true, letterSpacing: 0, paragraphSpacing: 8, metrics: CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-italic-underline", figma: "Content/Body/L-Regular-Italic-Underline", weight: 500, italic: true, underline: true, letterSpacing: 0, paragraphSpacing: 8, metrics: CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-bold", figma: "Content/Body/L-Bold", weight: 600, letterSpacing: 0, paragraphSpacing: 8, metrics: CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-bold-italic", figma: "Content/Body/L-Bold-Italic", weight: 600, italic: true, letterSpacing: 0, paragraphSpacing: 8, metrics: CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-bold-underline", figma: "Content/Body/L-Bold-Underline", weight: 600, underline: true, letterSpacing: 0, paragraphSpacing: 8, metrics: CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-bold-italic-underline", figma: "Content/Body/L-Bold-Italic-Underline", weight: 600, italic: true, underline: true, letterSpacing: 0, paragraphSpacing: 8, metrics: CONTENT_L, usage: CONTENT_USAGE },

  { name: "numbers-l", figma: "Numbers/L-Regular", weight: 400, tabularNums: true, letterSpacing: 0, paragraphSpacing: 8, metrics: NUMBER_L, usage: "Только числовые значения, цифры одинаковой ширины" },
  { name: "numbers-s", figma: "Numbers/S-Regular", weight: 400, tabularNums: true, letterSpacing: 0, metrics: NUMBER_S, usage: "Только числовые значения, цифры одинаковой ширины" },

  { name: "caption-s", figma: "Caption/S", weight: 500, uppercase: true, letterSpacing: 0.1, metrics: CAPTION_S, usage: "Небольшие подписи над заголовками и в графических элементах" },
];

/** CSS-переменные размера и высоты строки: `--text-title-xl-size`, `--text-title-xl-lh` */
export const sizeVar = (name: string) => `--text-${name}-size`;
export const lineHeightVar = (name: string) => `--text-${name}-lh`;
