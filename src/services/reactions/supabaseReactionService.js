import { env } from '../../config/env.js'
import { getDevice } from '../../lib/device.js'
import { readJson, writeJson } from '../../lib/storage.js'

const CACHE_KEY = 'reactions'
const TABLE_URL = `${env.supabaseUrl}/rest/v1/reactions`

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      apikey: env.supabaseAnonKey,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Supabase ${response.status}: ${await response.text()}`)
  }

  return response.status === 204 ? null : response.json().catch(() => null)
}

/**
 * Реакции в Supabase (таблица reactions, см. supabase/schema.sql) + кэш в localStorage:
 * без сети показываем последнее известное состояние.
 * @returns {import('./types.js').ReactionService}
 */
export function createSupabaseReactionService() {
  const device = getDevice()
  const cache = (value) => writeJson(CACHE_KEY, value)

  return {
    async getAll() {
      try {
        const rows = await request(`${TABLE_URL}?device_id=eq.${device.id}&select=content_key,reaction`)
        const all = Object.fromEntries(rows.map((row) => [row.content_key, row.reaction]))
        cache(all)
        return all
      } catch (error) {
        console.error('[reactions] не удалось загрузить, берём кэш', error)
        return readJson(CACHE_KEY, {})
      }
    },

    async set(contentKey, reaction) {
      const all = readJson(CACHE_KEY, {})
      if (reaction) all[contentKey] = reaction
      else delete all[contentKey]
      cache(all)

      if (reaction) {
        await request(`${TABLE_URL}?on_conflict=device_id,content_key`, {
          method: 'POST',
          headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
          body: JSON.stringify({
            device_id: device.id,
            content_key: contentKey,
            reaction,
            device_label: device.label,
            updated_at: new Date().toISOString(),
          }),
        })
      } else {
        await request(
          `${TABLE_URL}?device_id=eq.${device.id}&content_key=eq.${encodeURIComponent(contentKey)}`,
          { method: 'DELETE' },
        )
      }
    },

    /** Для админки: реакции всех устройств */
    async listAll() {
      return request(`${TABLE_URL}?select=device_id,content_key,reaction,device_label&order=updated_at.desc`)
    },
  }
}
