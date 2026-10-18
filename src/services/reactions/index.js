import { hasSupabase } from '../../config/env.js'
import { createLocalReactionService } from './localReactionService.js'

/**
 * Единая точка выбора реализации. Когда появится Supabase:
 * 1) создай supabaseReactionService.js с теми же методами (см. types.js);
 * 2) верни его здесь, если hasSupabase.
 */
function createReactionService() {
  if (hasSupabase && import.meta.env.DEV) {
    console.info('[reactions] Supabase env задан, но реализация ещё не подключена — используется localStorage')
  }

  return createLocalReactionService()
}

export const reactionService = createReactionService()
