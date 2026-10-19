import { hasSupabase } from '../../config/env.js'
import { createLocalReactionService } from './localReactionService.js'
import { createSupabaseReactionService } from './supabaseReactionService.js'

/** Supabase, если заданы переменные окружения, иначе localStorage */
function createReactionService() {
  return hasSupabase ? createSupabaseReactionService() : createLocalReactionService()
}

export const reactionService = createReactionService()
