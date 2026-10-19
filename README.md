Маленький рассказ в виде книжки-карточек. React + Vite, статический сайт для GitHub Pages.

## Запуск

```bash
npm install
npm run dev      # локально, http://localhost:5173
npm run build    # сборка в dist/
npm run lint     # проверка кода
```

Демо всех типов блоков: открой адрес с `?demo`, например `http://localhost:5173/?demo`.

## Как менять рассказ

Весь текст лежит в [`src/data/story.js`](src/data/story.js): страницы, блоки, порядок. Компоненты трогать не нужно.

- Картинки клади в `public/images/` и пиши `src: 'images/имя.jpg'`; видео — в `public/video/` (`src: 'video/имя.mp4'`).
- У каждой страницы и блока есть уникальный `id`. Не меняй его после того, как отправишь ссылку: на нём держатся условия, прогресс и (в будущем) лайки.
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
    story/      StoryPage, BlockRenderer (рендер блока по type)
    layout/     PageCard, Navigation
    ui/         Button, Message
  config/       constants.js, env.js (единственное место чтения env)
  data/         story.js, demo.js, ui.js
  hooks/        useStoryProgress, usePersistentState, useSwipe, useArrowKeys, useReactions
  lib/          conditions, storage, assetUrl, story helpers
  services/     reactions/ — интерфейс сервиса реакций + localStorage-заглушка
  styles/       tokens.css, base.css, layout.css, blocks.css
  types/        JSDoc-описание формата рассказа
```

## Деплой

Пуш в `main` запускает `.github/workflows/deploy.yml` и выкладывает сайт на GitHub Pages. `base: './'` в `vite.config.js` позволяет сборке работать из любой подпапки.

## Переменные окружения

См. [`.env.example`](.env.example). Локально скопируй его в `.env.local`. В git попадает только `.env.example`.
