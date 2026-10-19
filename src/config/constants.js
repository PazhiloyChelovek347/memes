// Поведенческие константы приложения (визуальные — в styles/tokens.css)

/** Минимальная длина свайпа в пикселях, чтобы перелистнуть страницу */
export const SWIPE_MIN_DISTANCE = 50

/** Префикс ключей в localStorage — чтобы не пересекаться с другими сайтами на github.io */
export const STORAGE_PREFIX = 'uwu'

/** Параметр в адресе, открывающий демо всех блоков: ...?demo */
export const DEMO_QUERY_PARAM = 'demo'

/** Параметр в адресе, открывающий админку с реакциями: ...?admin */
export const ADMIN_QUERY_PARAM = 'admin'

/** Эмодзи реакций (и на кнопках, и в админке) */
export const REACTION_EMOJI = { like: '❤️', dislike: '😡' }

/** Жесты реакций: два быстрых касания — ❤️, долгое удержание — 😡 */
export const DOUBLE_TAP_MS = 300
export const LONG_PRESS_MS = 1500
/** На сколько пикселей можно сдвинуть палец, чтобы жест ещё считался касанием */
export const TAP_MOVE_TOLERANCE = 12
