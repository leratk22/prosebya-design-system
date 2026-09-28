# Просебя — дизайн-система

Токены и компоненты дизайн-системы Просебя с каталогом в Storybook.

## Запуск

```bash
npm install
npm run storybook
```

Каталог откроется на http://localhost:6006.

## Что внутри

| Путь | Что это |
|---|---|
| `src/foundation/` | Раздел Foundation в каталоге: цвета (Primitive и Semantic для светлой и тёмной темы), типографика, шкала Numbers, радиусы, тени, брейкпоинты. Значения читаются из `tailwind.config.ts` |
| `src/components/ui/` | Базовые компоненты: Button, ButtonExpand, ButtonGroup, ButtonPlayPause, Badge, Checkbox, Highlight, Modal, Spinner, Avatar, Tabs, Textarea |
| `src/components/cards/` | Карточки контента: AudioCardWeb, BannerCardWeb, BigPhotoCard, ColoredCardSingle, WormCardWeb, SkillCourseCarousel и другие |
| `src/components/chat/` | Чат: ChatBubble (текст, файл, изображение; входящие и исходящие; статусы отправки), ChatFile |
| `src/components/illustrations/` | Иллюстрации бренда |
| `src/components/icons/` | Иконки |
| `tailwind.config.ts` | Токены: примитивы и семантика |
| `app/globals.css` | Шрифт Euclid Circular A и глобальные стили |
| `DESIGN_TOKENS.md` | Описание токенов |
| `AI_DESIGN_AND_CODE_RULES.md` | Правила работы с кодом и дизайном |

## Стек

Next.js 14, React 18, TypeScript, Tailwind CSS, Storybook 10.
