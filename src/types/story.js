/**
 * Описание формата рассказа (JSDoc-типы).
 * Редактор (VS Code) подсказывает поля в data-файлах благодаря этим типам.
 * Кода здесь нет — только документация.
 */

/**
 * Условие показа блока. Все указанные поля должны выполниться одновременно.
 * «Активирован» = кнопка нажата, tap-блок пройден до конца, на вопрос дан ответ.
 *
 * @typedef {object} Condition
 * @property {string} [clicked]    активирован конкретный id
 * @property {string[]} [all]      активированы все id из списка
 * @property {string[]} [oneFrom]  активирован хотя бы один id из списка
 * @property {Condition} [not]     вложенное условие НЕ выполняется
 */

/**
 * Общие поля любого блока.
 *
 * @typedef {object} BaseBlock
 * @property {string} id                 стабильный уникальный id (на него завязаны условия и лайки — не меняй после публикации)
 * @property {string} type               тип блока: text | image | button | tap | choice | <свой тип из реестра>
 * @property {Condition} [visibleWhen]   показывать блок только при условии
 * @property {boolean} [allowNext]       страница закрыта, пока этот блок не активирован
 */

/**
 * @typedef {BaseBlock & { type: 'text', text: string }} TextBlock
 * @typedef {BaseBlock & { type: 'image', src: string, alt: string, caption?: string }} ImageBlock
 * @typedef {'neutral' | 'positive' | 'negative'} ButtonVariant
 * @typedef {BaseBlock & { type: 'button', label: string, variant?: ButtonVariant, message?: string }} ButtonBlock
 * @typedef {BaseBlock & { type: 'tap', text: string, target: number, message?: string, buttonLabel?: string, doneLabel?: string }} TapBlock
 * @typedef {{ label: string, message?: string }} ChoiceOption
 * @typedef {BaseBlock & { type: 'choice', question: string, options: ChoiceOption[] }} ChoiceBlock
 * @typedef {TextBlock | ImageBlock | ButtonBlock | TapBlock | ChoiceBlock | (BaseBlock & Record<string, unknown>)} Block
 */

/**
 * @typedef {object} Page
 * @property {string} id
 * @property {string} title
 * @property {Block[]} blocks
 */

/**
 * @typedef {object} Story
 * @property {string} id      id рассказа (отдельный прогресс и лайки для каждого рассказа)
 * @property {Page[]} pages
 */

export {}
