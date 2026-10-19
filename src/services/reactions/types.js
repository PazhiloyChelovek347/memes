/**
 * Контракт сервиса реакций. Любая реализация (localStorage, Supabase, …)
 * должна иметь эти методы — тогда UI не придётся переписывать.
 *
 * @typedef {'like' | 'dislike'} Reaction
 *
 * @typedef {object} ReactionService
 * @property {() => Promise<Record<string, Reaction>>} getAll
 *   все реакции: ключ элемента контента (см. contentKey) → реакция
 * @property {(contentKey: string, reaction: Reaction | null) => Promise<void>} set
 *   поставить реакцию; null — убрать
 * @property {() => Promise<Array<{device_id: string, content_key: string, reaction: Reaction, device_label: string}>>} [listAll]
 *   только для админки (есть у Supabase-реализации): реакции всех устройств
 */

export {}
