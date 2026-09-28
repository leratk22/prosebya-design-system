/**
 * Путь к файлу из public/.
 * В приложении — от корня сайта (/images/…). В Storybook база задаётся в .storybook/main.ts
 * относительной (./), чтобы каталог работал не только из корня домена.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_ASSET_BASE ?? "/";
  return base + path.replace(/^\//, "");
}
