import * as React from "react";
import { textStyles, type TextStyleToken } from "../tokens/typography";
import { gapTokens, spacingRules, spacingScale } from "../tokens/spacing";
import {
  breakpoints,
  fontFamily,
  fontWeights,
  numbers,
  primitiveColors,
  primitiveFor,
  primitiveValue,
  radii,
  semanticColors,
  semanticValue,
  shadows,
  type ColorToken,
  type Theme,
} from "./tokens";

/** Шахматка под свотчем, чтобы было видно прозрачность */
const checkerboard = () =>
  `repeating-conic-gradient(${primitiveValue("gray-muted")} 0 25%, ${primitiveValue("system-white")} 0 50%) 0 0 / 12px 12px`;

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        <h2 className="text-title-m">{title}</h2>
        {description && <p className="text-body-m-regular text-light-fg-tertiary">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-40 p-24 font-euclid text-light-fg-primary">
      {children}
    </div>
  );
}

function Swatch({ value, size = 56 }: { value: string; size?: number }) {
  return (
    <div
      className="shrink-0 overflow-hidden rounded-s border border-light-border-secondary"
      style={{ width: size, height: size, background: checkerboard() }}
    >
      <div className="h-full w-full" style={{ background: value }} />
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-body-s-regular">{children}</code>;
}

/* ---------- Цвета ---------- */

function PrimitiveCard({ token }: { token: ColorToken }) {
  return (
    <div className="flex items-center gap-12">
      <Swatch value={token.value} />
      <div className="flex min-w-0 flex-col gap-2">
        <span className="text-label-m font-medium">{token.name}</span>
        <span className="text-light-fg-tertiary">
          <Code>{token.value}</Code>
        </span>
      </div>
    </div>
  );
}

/** Примитивы: палитра с именами и значениями */
export function PrimitiveColors() {
  return (
    <Page>
      {primitiveColors.map((group) => (
        <Section key={group.key} title={group.label}>
          <div className="grid gap-16" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
            {group.tokens.map((token) => (
              <PrimitiveCard key={token.name} token={token} />
            ))}
          </div>
        </Section>
      ))}
    </Page>
  );
}

function SemanticRow({ token, theme }: { token: ColorToken; theme: Theme }) {
  const refs = primitiveFor(token.value);
  return (
    <div
      className="grid items-center gap-12 border-b py-12"
      style={{
        gridTemplateColumns: "56px minmax(0, 1fr)",
        borderColor: semanticValue(theme, "border-secondary"),
      }}
    >
      <Swatch value={token.value} />
      <div className="flex min-w-0 flex-col gap-2">
        <span className="text-label-m font-medium">{token.name}</span>
        <span className="flex flex-wrap gap-x-12 gap-y-2" style={{ color: semanticValue(theme, "fg-tertiary") }}>
          <Code>{token.value}</Code>
          <span className="text-body-s-regular">
            {refs.length > 0 ? `→ ${refs.join(", ")}` : "→ нет примитива с таким значением"}
          </span>
        </span>
      </div>
    </div>
  );
}

/** Семантика: токены по назначению и примитивы, на которые они ссылаются */
export function SemanticColors({ theme }: { theme: Theme }) {
  return (
    <div
      className="flex flex-col gap-40 p-24 font-euclid"
      style={{
        background: semanticValue(theme, "bg-primary"),
        color: semanticValue(theme, "fg-primary"),
      }}
    >
      {semanticColors(theme).map((group) => (
        <section key={group.key} className="flex flex-col gap-8">
          <h2 className="text-title-m">{group.label}</h2>
          <div className="grid gap-x-24" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
            {group.tokens.map((token) => (
              <SemanticRow key={token.name} token={token} theme={theme} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ---------- Типографика ---------- */

function styleTraits(style: TextStyleToken) {
  const weight = fontWeights.find(([, value]) => Number(value) === style.weight)?.[0] ?? style.weight;
  return [
    weight,
    style.italic && "italic",
    style.underline && "underline",
    style.uppercase && "uppercase",
    style.tabularNums && "tabular-nums",
    style.letterSpacing !== 0 && `трекинг ${Math.round(style.letterSpacing * 1000) / 10}%`,
    style.paragraphSpacing && `абзац +${style.paragraphSpacing}`,
  ]
    .filter(Boolean)
    .join(" · ");
}

const GROUPS: Array<[string, string]> = [
  ["title", "Title"],
  ["body", "Body"],
  ["label", "Label"],
  ["content", "Content"],
  ["numbers", "Numbers"],
  ["caption", "Caption"],
];

/** Все текстовые стили Figma: пример, начертание и размер */
export function TextStyles({ sample }: { sample: string }) {
  return (
    <Page>
      <Section
        title="Текстовые стили"
        description={`${fontFamily[0]}: Regular, Medium, Semibold и курсивы. Стиль задаёт всё сразу — размер, высоту строки, трекинг и начертание.`}
      >
        {GROUPS.map(([prefix, label]) => {
          const group = textStyles.filter((style) => style.name.startsWith(prefix));
          return (
            <div key={prefix} className="flex flex-col">
              <h3 className="text-title-s pb-8">{label}</h3>
              <p className="text-body-m-regular pb-8 text-light-fg-tertiary">{group[group.length - 1].usage}</p>
              {group.map((style) => (
                <div
                  key={style.name}
                  className="grid items-baseline gap-16 border-b border-light-border-secondary py-16"
                  style={{ gridTemplateColumns: "minmax(200px, 240px) minmax(0, 1fr)" }}
                >
                  <div className="flex flex-col gap-4">
                    <span className="text-label-m font-medium">{`text-${style.name}`}</span>
                    <span className="text-body-s-regular text-light-fg-tertiary">{style.figma}</span>
                    <span className="text-body-s-regular text-light-fg-tertiary">{styleTraits(style)}</span>
                    <span className="text-body-s-regular text-light-fg-tertiary">{`${style.size} / ${style.lineHeight}`}</span>
                  </div>
                  <p
                    style={{
                      fontSize: style.size,
                      lineHeight: `${style.lineHeight}px`,
                      letterSpacing: `${style.letterSpacing}em`,
                      fontWeight: style.weight,
                      fontStyle: style.italic ? "italic" : undefined,
                      textDecorationLine: style.underline ? "underline" : undefined,
                      textTransform: style.uppercase ? "uppercase" : undefined,
                      fontVariantNumeric: style.tabularNums ? "tabular-nums" : undefined,
                    }}
                  >
                    {prefix === "numbers" ? "1 234 567,89 ₽" : sample}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </Section>
    </Page>
  );
}

/** Начертания шрифта */
export function FontWeights({ sample }: { sample: string }) {
  return (
    <Page>
      <Section title="Начертания" description="В Figma используются три начертания. Курсив есть у Semibold (Decorative, Content Bold-Italic) и Medium (Content Italic).">
        <div className="flex flex-col gap-16">
          {fontWeights.flatMap(([name, value]) =>
            [false, true].map((italic) => (
              <div key={name + italic} className="grid items-baseline gap-16" style={{ gridTemplateColumns: "200px minmax(0, 1fr)" }}>
                <span className="text-label-m font-medium">
                  {`font-${name}${italic ? " italic" : ""}`} <span className="text-body-s-regular text-light-fg-tertiary">{value}</span>
                </span>
                <span className="text-title-m" style={{ fontWeight: Number(value), fontStyle: italic ? "italic" : "normal" }}>
                  {sample}
                </span>
              </div>
            )),
          )}
        </div>
      </Section>
    </Page>
  );
}

function TokenList({
  entries,
  format,
}: {
  entries: Array<[string, string]>;
  format: (name: string) => string;
}) {
  return (
    <div className="flex flex-col">
      {entries.map(([name, value]) => (
        <div key={name} className="flex justify-between gap-16 border-b border-light-border-secondary py-8">
          <span className="text-label-m font-medium">{format(name)}</span>
          <Code>{value}</Code>
        </div>
      ))}
    </div>
  );
}

/* ---------- Отступы, радиусы, тени, брейкпоинты ---------- */

export function Spacing() {
  const system = new Set(spacingScale.map((step) => step.value));
  const extra = numbers.filter(([, value]) => !system.has(parseFloat(value)));
  return (
    <Page>
      <Section
        title="Шкала отступов"
        description="Системные значения из Figma для отступов и промежутков: p-*, m-*, gap-*. Шкалу не расширяем без явной необходимости."
      >
        <div className="flex flex-col">
          {spacingScale.map((step) => (
            <div
              key={step.value}
              className="grid items-center gap-16 border-b border-light-border-secondary py-12"
              style={{ gridTemplateColumns: "96px 136px minmax(0, 1fr)" }}
            >
              <div className="flex flex-col">
                <span className="text-label-m font-medium">{`${step.value} px`}</span>
                <span className="text-body-s-regular text-light-fg-tertiary">{step.name}</span>
              </div>
              <div className="h-16 rounded-checkbox bg-brand-orange" style={{ width: step.value }} />
              <span className="text-body-m-regular text-light-fg-secondary">{step.usage}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Как выбирать" description="Правила со страницы Spacing в Figma.">
        <ul className="flex list-disc flex-col gap-8 pl-20 text-body-m-regular">
          {spacingRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </Section>
      <Section
        title="Gap на узком экране"
        description="Переменные Gap из коллекции Layout: на ширине 320 шаг на ступень меньше. В коде пока не подключены."
      >
        <div className="grid gap-x-24" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
          {gapTokens.map((gap) => (
            <div key={gap.name} className="flex justify-between gap-16 border-b border-light-border-secondary py-8">
              <span className="text-label-m font-medium">{gap.name}</span>
              <Code>{`${gap["320"]} → ${gap["375"]}`}</Code>
            </div>
          ))}
        </div>
      </Section>
      <Section
        title="Остальные числа"
        description="Шкала Numbers в коде шире: эти значения нужны для размеров элементов и экранов (w-*, h-*, max-w-*), а не для отступов."
      >
        <p className="text-body-m-regular text-light-fg-tertiary">{extra.map(([, value]) => value).join(", ")}</p>
      </Section>
    </Page>
  );
}

export function Radius() {
  return (
    <Page>
      <Section title="Радиусы" description="Классы rounded-*.">
        <div className="grid gap-24" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}>
          {radii.map(([name, value]) => (
            <div key={name} className="flex flex-col gap-8">
              <div className="h-80 w-full bg-light-bg-secondary" style={{ borderRadius: value }} />
              <span className="text-label-m font-medium">{`rounded-${name}`}</span>
              <Code>{value}</Code>
            </div>
          ))}
        </div>
      </Section>
    </Page>
  );
}

export function Shadows() {
  return (
    <Page>
      <Section title="Тени" description="Классы shadow-*.">
        <div className="flex flex-wrap gap-24 bg-light-bg-tertiary p-24">
          {shadows.map(([name, value]) => (
            <div
              key={name}
              className="flex w-full max-w-360 flex-col gap-4 rounded-m bg-light-bg-primary p-24"
              style={{ boxShadow: value }}
            >
              <span className="text-label-m font-medium">{`shadow-${name}`}</span>
              <Code>{value}</Code>
            </div>
          ))}
        </div>
      </Section>
    </Page>
  );
}

export function Breakpoints() {
  return (
    <Page>
      <Section title="Брейкпоинты" description="Префиксы xs: … 2xl:. Десктопная версия компонентов начинается с md.">
        <TokenList entries={breakpoints} format={(name) => `${name}:`} />
      </Section>
    </Page>
  );
}
