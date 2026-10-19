Маленький рассказ в виде книжки-карточек. React + Vite, статический сайт для GitHub Pages.

## Запуск

```bash
npm install
npm run dev      # локально, http://localhost:5173
npm run build    # сборка в dist/
npm run lint     # проверка кода
```

Демо всех типов блоков: открой адрес с `?demo`, например `http://localhost:5173/?demo`.

## Реакции и админка

- Читатель ставит реакцию жестом на блоке: **двойной тап/клик** — ❤️, **удержание 1.5 с** — 😡. Повтор того же жеста снимает реакцию. Реакция видна маленьким значком на блоке. По кнопкам, ссылкам и `<video>` жесты не срабатывают.
- Реакции пишутся в Supabase прямо с фронта (без входа и паролей). Устройство определяется случайным id в localStorage и меткой из user-agent (например «iPhone · Safari #1a2b»). Без Supabase-переменных реакции хранятся только в localStorage.
- **Админка:** `?admin` (вместе с `?demo` — для демо). Это копия рассказа со всеми блоками подряд; под блоками бейджи ❤️/😡 с устройством. Фильтр сверху оставляет блоки с реакциями выбранного устройства.
- Настройка Supabase: создай **отдельный** проект, выполни [`supabase/schema.sql`](supabase/schema.sql) в SQL Editor, URL и публичный ключ (publishable/anon) положи в `.env.local` и в секреты GitHub (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- Безопасность: ключ публичный, доступ к таблице открыт для `anon` — реакции может прочитать и изменить любой, кто знает адрес проекта. Для сайта с мемами это осознанный компромисс.

## Как менять рассказ

Весь текст лежит в [`src/data/story.js`](src/data/story.js): страницы, блоки, порядок. Компоненты трогать не нужно.

- Картинки клади в `public/images/` и пиши `src: 'images/имя.jpg'`; видео — в `public/video/` (`src: 'video/имя.mp4'`).
- У каждой страницы и блока есть уникальный `id`. Не меняй его после того, как отправишь ссылку: на нём держатся условия, прогресс и реакции (лайки/дизлайки) — они хранятся по id блока.
- Шпаргалка со всеми полями: [`src/data/demo.js`](src/data/demo.js) и типы в [`src/types/story.js`](src/types/story.js).
- В режиме `npm run dev` консоль браузера предупредит об опечатках: повторяющиеся id, неизвестный тип блока, условие на несуществующий id.

| type     | поля                                                        |
| -------- | ----------------------------------------------------------- |
| `text`   | `text`                                                      |
| `image`  | `src`, `alt`, `caption?`                                    |
| `video`  | `src`, `caption?`, `poster?`                                |
| `button` | `label`, `variant?` (neutral/positive/negative), `message?`, `disabledWhen?`, `messageVariants?` |
| `tap`    | `text`, `target`, `message?`, `buttonLabel?`, `doneLabel?`  |
| `choice` | `question`, `options: [{ label, message? }]`                |

Общие поля любого блока: `visibleWhen` (условие показа: `clicked`, `all`, `oneFrom`, `not`) и `allowNext: true` (дальше нельзя, пока блок не нажат/не пройден).

Поля кнопки `button` для «взаимоисключающих» путей (живой пример — первая страница демо, `?demo`):

- `disabledWhen: <условие>` — когда условие выполнено, кнопка остаётся видимой, но неактивна. Условие такое же, как у `visibleWhen`.
- `messageVariants: [{ when: <условие>, message: '...' }]` — другой текст ответа после нажатия. Берётся первый подошедший вариант, иначе обычный `message`.

Пример: зелёная кнопка блокирует красные, а красные меняют её ответ.

```js
{ id: 'yes', type: 'button', label: 'Да', variant: 'positive', message: 'Так просто?',
  messageVariants: [{ when: { oneFrom: ['no-1', 'no-2'] }, message: 'Ты просто проверяешь, как это работает' }] },
{ id: 'no-1', type: 'button', label: 'Нет', variant: 'negative', disabledWhen: { clicked: 'yes' } },
```

Цвета, размеры и скорость анимаций находятся в [`src/styles/tokens.css`](src/styles/tokens.css), тексты кнопок навигации в [`src/data/ui.js`](src/data/ui.js).

## Как добавить новый тип блока

1. Создай компонент в `src/components/blocks/` (или `blocks/custom/`), он получает `{ block }`, то есть весь объект из data-файла.
2. Если нужен прогресс (нажато/выполнено), используй `useProgress()` (см. `custom/ExampleCustomBlock.jsx`).
3. Добавь одну строку в [`src/components/blocks/registry.js`](src/components/blocks/registry.js).

## Структура

```
src/
  app/          App.jsx — корень: прогресс, свайпы, навигация
  components/
    blocks/     по компоненту на тип блока + registry.js
    story/      StoryPage, BlockRenderer (рендер блока по type + жесты), ReactionMark
    admin/      AdminApp — страница ?admin
    layout/     PageCard, Navigation
    ui/         Button, Message
  config/       constants.js, env.js (единственное место чтения env)
  data/         story.js, demo.js, ui.js
  hooks/        useStoryProgress, usePersistentState, useSwipe, useArrowKeys, useReactions, useReactionGestures
  lib/          conditions, storage, assetUrl, story helpers
  services/     reactions/ — интерфейс сервиса реакций, реализации Supabase и localStorage
  styles/       tokens.css, base.css, layout.css, blocks.css
  supabase/     schema.sql — таблица reactions + RLS (в корне репозитория, не в src)
  types/        JSDoc-описание формата рассказа
```

## Деплой

Пуш в `main` запускает `.github/workflows/deploy.yml` и выкладывает сайт на GitHub Pages. `base: './'` в `vite.config.js` позволяет сборке работать из любой подпапки.

## Переменные окружения

См. [`.env.example`](.env.example). Локально скопируй его в `.env.local`. В git попадает только `.env.example`.
