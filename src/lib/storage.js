import { STORAGE_PREFIX } from '../config/constants.js'

// Безопасная обёртка над localStorage: приватный режим, битый JSON
// или переполнение хранилища не должны ронять приложение.

const fullKey = (key) => `${STORAGE_PREFIX}:${key}`

export function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(fullKey(key))
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeJson(key, value) {
  try {
    window.localStorage.setItem(fullKey(key), JSON.stringify(value))
  } catch {
    // хранилище недоступно — просто не сохраняем
  }
}
