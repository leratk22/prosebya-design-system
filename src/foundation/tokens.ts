import tailwindConfig from "../../tailwind.config";

/**
 * Токены для раздела Foundation. Все значения читаются из tailwind.config.ts —
 * единственного источника токенов в проекте, здесь ничего не хардкодится.
 */

type TokenTree = { [key: string]: string | TokenTree };

export interface ColorToken {
  /** Имя как в классах Tailwind: `core-alpha-80`, `light-bg-primary` */
  name: string;
  value: string;
}

export interface ColorGroup {
  key: string;
  label: string;
  tokens: ColorToken[];
}

const extend = (tailwindConfig.theme?.extend ?? {}) as Record<string, any>;
const colors = extend.colors as Record<string, TokenTree>;

/** Разворачивает вложенные цвета в плоский список, как это делает плагин в tailwind.config.ts */
function flattenColors(tree: TokenTree, prefix: string): ColorToken[] {
  return Object.entries(tree).flatMap(([key, value]) => {
    const name = key === "DEFAULT" ? prefix : `${prefix}-${key}`;
    return typeof value === "string" ? [{ name, value }] : flattenColors(value, name);
  });
}

const PRIMITIVE_GROUPS: Array<[string, string]> = [
  ["brand", "Brand — брендовые"],
  ["core", "Core — основной"],
  ["core-inverted", "Core Inverted — инвертированный"],
  ["gray", "Gray — серые"],
  ["system", "System — системные"],
  ["feedback", "Feedback — обратная связь"],
];

export const primitiveColors: ColorGroup[] = PRIMITIVE_GROUPS.map(([key, label]) => ({
  key,
  label,
  tokens: flattenColors(colors[key] as TokenTree, key),
}));

const SEMANTIC_GROUPS: Array<[string, string]> = [
  ["bg", "BG — фоны"],
  ["fg", "FG — текст и иконки"],
  ["border", "Border — границы"],
  ["system", "System — системные"],
];

export type Theme = "light" | "dark";

export function semanticColors(theme: Theme): ColorGroup[] {
  const tree = colors[theme] as Record<string, TokenTree>;
  return SEMANTIC_GROUPS.map(([key, label]) => ({
    key,
    label,
    tokens: flattenColors(tree[key], `${theme}-${key}`),
  }));
}

/** Значение семантического токена по имени, например `light-bg-primary` */
export function semanticValue(theme: Theme, name: string): string {
  const all = semanticColors(theme).flatMap((group) => group.tokens);
  return all.find((token) => token.name === `${theme}-${name}`)?.value ?? "";
}

/** Значение примитива по имени, например `gray-muted` */
export function primitiveValue(name: string): string {
  const all = primitiveColors.flatMap((group) => group.tokens);
  return all.find((token) => token.name === name)?.value ?? "";
}

const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, "");

const primitiveByValue = new Map<string, string[]>();
primitiveColors
  .flatMap((group) => group.tokens)
  .forEach(({ name, value }) => {
    const key = normalize(value);
    primitiveByValue.set(key, [...(primitiveByValue.get(key) ?? []), name]);
  });

/**
 * Примитивы с тем же значением, что у семантического токена.
 * В конфиге семантика задана значениями, а не ссылками, поэтому связь восстанавливается по значению.
 */
export function primitiveFor(value: string): string[] {
  return primitiveByValue.get(normalize(value)) ?? [];
}

/* ---------- Типографика ---------- */

export const fontFamily = (extend.fontFamily as Record<string, string[]>).euclid;
export const fontWeights = Object.entries(extend.fontWeight as Record<string, string>);

/* ---------- Числа, радиусы, тени, брейкпоинты ---------- */

const px = (value: string) => parseFloat(value);

/** Шкала Numbers: из неё берутся отступы, размеры шрифтов и размеры элементов */
export const numbers = Object.entries(extend.spacing as Record<string, string>).sort(
  (a, b) => px(a[1]) - px(b[1]),
);
export const radii = Object.entries(extend.borderRadius as Record<string, string>).sort(
  (a, b) => px(a[1]) - px(b[1]),
);
export const shadows = Object.entries(extend.boxShadow as Record<string, string>);
export const breakpoints = Object.entries(extend.screens as Record<string, string>);
