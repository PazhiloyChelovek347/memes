import { useEffect, useState } from 'react'

import { reactionService } from '../services/reactions/index.js'

/**
 * Реакции на элементы контента. UI работает только с этим хуком,
 * а не с хранилищем напрямую — поэтому смена localStorage → Supabase его не затронет.
 */
export function useReactions() {
  const [reactions, setReactions] = useState({})

  useEffect(() => {
    let cancelled = false

    reactionService.getAll().then((all) => {
      if (!cancelled) setReactions(all)
    })

    return () => {
      cancelled = true
    }
  }, [])

  /** Повторная та же реакция снимает её (как повторный лайк) */
  const toggle = (contentKey, reaction) => {
    const next = reactions[contentKey] === reaction ? null : reaction

    setReactions((current) => {
      const updated = { ...current }
      if (next) updated[contentKey] = next
      else delete updated[contentKey]
      return updated
    })

    reactionService.set(contentKey, next).catch((error) => {
      console.error('[reactions] не удалось сохранить', error)
    })
  }

  return { reactions, getReaction: (contentKey) => reactions[contentKey] ?? null, toggle }
}
