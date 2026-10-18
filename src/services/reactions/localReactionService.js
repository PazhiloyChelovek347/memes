import { readJson, writeJson } from '../../lib/storage.js'

const KEY = 'reactions'

/**
 * Заглушка: хранит реакции в localStorage этого браузера.
 * @returns {import('./types.js').ReactionService}
 */
export function createLocalReactionService() {
  return {
    async getAll() {
      return readJson(KEY, {})
    },

    async set(contentKey, reaction) {
      const all = readJson(KEY, {})

      if (reaction) all[contentKey] = reaction
      else delete all[contentKey]

      writeJson(KEY, all)
    },
  }
}
