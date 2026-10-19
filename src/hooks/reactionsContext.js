import { createContext, useContext } from 'react'

/**
 * Реакции для BlockRenderer.
 * Клиент: { getReaction(key), toggle(key, reaction) }.
 * Админка: { getBadges(key) } — список { device_id, device_label, reaction }.
 */
export const ReactionsContext = createContext(null)

export function useReactionsContext() {
  return useContext(ReactionsContext)
}

/** Ключ контента текущего блока — чтобы ReactionMark внутри блока знал, чьи реакции показывать */
export const BlockKeyContext = createContext(null)
