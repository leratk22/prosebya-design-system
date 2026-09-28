/**
 * Текстовые стили из Figma «Макеты для разработки (mobile)», группа MVP2.0.
 * Один размер на стиль — как в текстовых стилях и компонентах Figma.
 *
 * Отсюда tailwind.config.ts собирает классы `text-*`, а Storybook — раздел Foundation.
 */

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
  size: number;
  lineHeight: number;
  /** Где используется — из описания в Figma */
  usage?: string;
}

// Размер и высота строки по группам
const TITLE_XL = { size: 28, lineHeight: 32 };
const TITLE_L = { size: 24, lineHeight: 28 };
const TITLE_M = { size: 20, lineHeight: 24 };
const TITLE_S = { size: 16, lineHeight: 20 };
const BODY_XL = { size: 20, lineHeight: 28 };
const BODY_L = { size: 16, lineHeight: 24 };
const BODY_M = { size: 14, lineHeight: 20 };
const BODY_S = { size: 12, lineHeight: 16 };
const CONTENT_L = { size: 16, lineHeight: 24 };
const LABEL_L = { size: 16, lineHeight: 24 };
const LABEL_M = { size: 14, lineHeight: 20 };
const LABEL_S = { size: 12, lineHeight: 16 };
const LABEL_XS = { size: 10, lineHeight: 12 };
const NUMBER_L = { size: 16, lineHeight: 24 };
const NUMBER_S = { size: 12, lineHeight: 16 };
const CAPTION_S = { size: 12, lineHeight: 16 };

const TITLE_USAGE = "Заголовки страниц и блоков";
const DECORATIVE_USAGE = "Акцент на одном-двух словах заголовка, только вместе с обычным Title. Цвет — FG/Tertiary";
const BODY_USAGE = "Основной текст интерфейса, карточек и текстовых блоков";
const LABEL_USAGE = "Только кнопки и активные элементы. Не для заголовков и наборного текста";
const CONTENT_USAGE = "Только статьи: Body с увеличенным отступом между абзацами";

export const textStyles: TextStyleToken[] = [
  { name: "title-xl-decorative", figma: "Title/XL-Decorative", weight: 600, italic: true, letterSpacing: -0.02, ...TITLE_XL, usage: DECORATIVE_USAGE },
  { name: "title-xl", figma: "Title/XL", weight: 600, letterSpacing: -0.02, ...TITLE_XL, usage: TITLE_USAGE },
  { name: "title-l-decorative", figma: "Title/L-Decorative", weight: 600, italic: true, letterSpacing: -0.015, ...TITLE_L, usage: DECORATIVE_USAGE },
  { name: "title-l", figma: "Title/L", weight: 600, letterSpacing: -0.015, ...TITLE_L, lineHeight: 32, usage: TITLE_USAGE },
  { name: "title-m-decorative", figma: "Title/M-Decorative", weight: 600, italic: true, letterSpacing: -0.01, ...TITLE_M, usage: DECORATIVE_USAGE },
  { name: "title-m", figma: "Title/M", weight: 600, letterSpacing: -0.01, ...TITLE_M, usage: TITLE_USAGE },
  { name: "title-s-decorative", figma: "Title/S-Decorative", weight: 600, italic: true, letterSpacing: 0, ...TITLE_S, usage: DECORATIVE_USAGE },
  { name: "title-s", figma: "Title/S", weight: 600, letterSpacing: 0, ...TITLE_S, usage: TITLE_USAGE },

  { name: "body-xl-medium", figma: "Body/XL-Medium", weight: 500, letterSpacing: 0, ...BODY_XL, usage: BODY_USAGE },
  { name: "body-xl-regular", figma: "Body/XL-Regular", weight: 400, letterSpacing: 0, ...BODY_XL, usage: BODY_USAGE },
  { name: "body-l-medium", figma: "Body/L-Medium", weight: 500, letterSpacing: 0, ...BODY_L, usage: BODY_USAGE },
  { name: "body-l-regular", figma: "Body/L-Regular", weight: 400, letterSpacing: 0, ...BODY_L, usage: BODY_USAGE },
  { name: "body-m-medium", figma: "Body/M-Medium", weight: 500, letterSpacing: 0, ...BODY_M, usage: BODY_USAGE },
  { name: "body-m-regular", figma: "Body/M-Regular", weight: 400, letterSpacing: 0, ...BODY_M, usage: BODY_USAGE },
  { name: "body-s-medium", figma: "Body/S-Medium", weight: 500, letterSpacing: 0, ...BODY_S, usage: BODY_USAGE },
  { name: "body-s-regular", figma: "Body/S-Regular", weight: 400, letterSpacing: 0, ...BODY_S, usage: BODY_USAGE },

  { name: "label-l", figma: "Label/L", weight: 600, letterSpacing: 0, ...LABEL_L, usage: LABEL_USAGE },
  { name: "label-m", figma: "Label/M", weight: 600, letterSpacing: 0, ...LABEL_M, usage: LABEL_USAGE },
  { name: "label-s", figma: "Label/S", weight: 600, letterSpacing: 0, ...LABEL_S, usage: LABEL_USAGE },
  { name: "label-xs", figma: "Label/XS", weight: 500, letterSpacing: 0, ...LABEL_XS, usage: LABEL_USAGE },

  { name: "content-l-regular", figma: "Content/Body/L-Regular", weight: 400, letterSpacing: 0, paragraphSpacing: 8, ...CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-italic", figma: "Content/Body/L-Italic", weight: 500, italic: true, letterSpacing: 0, paragraphSpacing: 8, ...CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-underline", figma: "Content/Body/L-Underline", weight: 400, underline: true, letterSpacing: 0, paragraphSpacing: 8, ...CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-italic-underline", figma: "Content/Body/L-Regular-Italic-Underline", weight: 500, italic: true, underline: true, letterSpacing: 0, paragraphSpacing: 8, ...CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-bold", figma: "Content/Body/L-Bold", weight: 600, letterSpacing: 0, paragraphSpacing: 8, ...CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-bold-italic", figma: "Content/Body/L-Bold-Italic", weight: 600, italic: true, letterSpacing: 0, paragraphSpacing: 8, ...CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-bold-underline", figma: "Content/Body/L-Bold-Underline", weight: 600, underline: true, letterSpacing: 0, paragraphSpacing: 8, ...CONTENT_L, usage: CONTENT_USAGE },
  { name: "content-l-bold-italic-underline", figma: "Content/Body/L-Bold-Italic-Underline", weight: 600, italic: true, underline: true, letterSpacing: 0, paragraphSpacing: 8, ...CONTENT_L, usage: CONTENT_USAGE },

  { name: "numbers-l", figma: "Numbers/L-Regular", weight: 400, tabularNums: true, letterSpacing: 0, paragraphSpacing: 8, ...NUMBER_L, usage: "Только числовые значения, цифры одинаковой ширины" },
  { name: "numbers-s", figma: "Numbers/S-Regular", weight: 400, tabularNums: true, letterSpacing: 0, ...NUMBER_S, usage: "Только числовые значения, цифры одинаковой ширины" },

  { name: "caption-s", figma: "Caption/S", weight: 500, uppercase: true, letterSpacing: 0.1, ...CAPTION_S, usage: "Небольшие подписи над заголовками и в графических элементах" },
];

