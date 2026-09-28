import * as React from "react";
import {
  breakpoints,
  fontFamily,
  fontWeights,
  letterSpacings,
  lineHeights,
  numbers,
  primitiveColors,
  primitiveFor,
  primitiveValue,
  radii,
  semanticColors,
  semanticValue,
  shadows,
  textStyles,
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
        <h2 className="text-title-l font-semibold">{title}</h2>
        {description && <p className="text-body-l text-light-fg-tertiary">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-40 p-24 font-euclid text-light-fg-primary">{children}</div>
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
  return <code className="font-mono text-body-m">{children}</code>;
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
          <span className="text-body-m">
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
          <h2 className="text-title-l font-semibold">{group.label}</h2>
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

export type Weight = "light" | "regular" | "medium" | "semibold" | "bold";

const weightValue = (weight: Weight) => fontWeights.find(([name]) => name === weight)?.[1];

/** Каждый текстовый стиль строкой-примером */
export function TextStyles({ sample, weight }: { sample: string; weight: Weight }) {
  return (
    <Page>
      <Section
        title="Текстовые стили"
        description={`Шрифт ${fontFamily[0]}. Стиль задаёт размер, высоту строки и трекинг; насыщенность задаётся отдельно классом font-*.`}
      >
        <div className="flex flex-col">
          {textStyles.map((style) => (
            <div
              key={style.name}
              className="grid items-baseline gap-16 border-b border-light-border-secondary py-16"
              style={{ gridTemplateColumns: "minmax(120px, 160px) minmax(0, 1fr)" }}
            >
              <div className="flex flex-col gap-2">
                <span className="text-label-m font-medium">{`text-${style.name}`}</span>
                <span className="text-body-m text-light-fg-tertiary">
                  {`${style.fontSize} / ${style.lineHeight}`}
                  {style.letterSpacing !== "0" && ` · ${style.letterSpacing}`}
                </span>
              </div>
              <p
                style={{
                  fontSize: style.fontSize,
                  lineHeight: style.lineHeight,
                  letterSpacing: style.letterSpacing,
                  fontWeight: weightValue(weight),
                }}
              >
                {sample}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </Page>
  );
}

/** Насыщенности шрифта */
export function FontWeights({ sample }: { sample: string }) {
  return (
    <Page>
      <Section title="Насыщенность" description="Классы font-light … font-bold.">
        <div className="flex flex-col gap-16">
          {fontWeights.map(([name, value]) => (
            <div key={name} className="grid items-baseline gap-16" style={{ gridTemplateColumns: "160px minmax(0, 1fr)" }}>
              <span className="text-label-m font-medium">
                {`font-${name}`} <span className="text-body-m text-light-fg-tertiary">{value}</span>
              </span>
              <span className="text-title-l" style={{ fontWeight: Number(value) }}>
                {sample}
              </span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Высота строки и трекинг" description="Отдельные токены leading-* и tracking-*.">
        <div className="grid gap-24" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
          <TokenList entries={lineHeights} format={(name) => `leading-${name}`} />
          <TokenList entries={letterSpacings} format={(name) => `tracking-${name}`} />
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

/* ---------- Числа, радиусы, тени, брейкпоинты ---------- */

/** Сколько пикселей показывать полосой; большие значения — размеры экранов, их списком */
const BAR_LIMIT = 160;

export function Spacing() {
  const bars = numbers.filter(([, value]) => parseFloat(value) <= BAR_LIMIT);
  const large = numbers.filter(([, value]) => parseFloat(value) > BAR_LIMIT);
  return (
    <Page>
      <Section
        title="Numbers — отступы и размеры"
        description="Одна шкала на отступы (p-*, m-*, gap-*), размеры шрифтов и размеры элементов. Значения вне шкалы не используются."
      >
        <div className="flex flex-col gap-8">
          {bars.map(([name, value]) => (
            <div key={name} className="grid items-center gap-16" style={{ gridTemplateColumns: "56px minmax(0, 1fr)" }}>
              <span className="text-label-m font-medium">{name}</span>
              <div className="h-16 rounded-checkbox bg-brand-orange" style={{ width: value }} />
            </div>
          ))}
        </div>
        <p className="text-body-l text-light-fg-tertiary">
          Крупные значения шкалы (ширины экранов и контейнеров):{" "}
          {large.map(([, value]) => value).join(", ")}
        </p>
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
