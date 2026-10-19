import { useEffect, useMemo, useState } from 'react'

import PageCard from '../layout/PageCard.jsx'
import BlockRenderer from '../story/BlockRenderer.jsx'
import { getActiveStory } from '../../data/index.js'
import { ProgressContext } from '../../hooks/progressContext.js'
import { ReactionsContext } from '../../hooks/reactionsContext.js'
import { reactionService } from '../../services/reactions/index.js'
import { contentKey } from '../../lib/story.js'

const story = getActiveStory()

// Админка только смотрит: все блоки видны, интерактив ничего не сохраняет
const progress = {
  storyId: story.id,
  isVisible: () => true,
  isActive: () => false,
  activate: () => {},
  getAnswer: () => undefined,
  setAnswer: () => {},
  getTaps: () => 0,
  addTap: () => {},
}

const ALL = 'all'

/** Копия рассказа со всеми страницами подряд и бейджами реакций; фильтр по устройству */
function AdminApp() {
  const [rows, setRows] = useState(null)
  const [loadError, setError] = useState('')
  const [deviceFilter, setDeviceFilter] = useState(ALL)

  useEffect(() => {
    if (!reactionService.listAll) return

    reactionService.listAll().then(setRows).catch((e) => setError(String(e.message ?? e)))
  }, [])

  const error = reactionService.listAll
    ? loadError
    : 'Supabase не настроен (нет VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)'

  const devices = useMemo(() => {
    const byId = new Map()
    for (const row of rows ?? []) byId.set(row.device_id, row.device_label)
    return [...byId]
  }, [rows])

  const byKey = useMemo(() => {
    const map = new Map()
    for (const row of rows ?? []) {
      if (deviceFilter !== ALL && row.device_id !== deviceFilter) continue
      map.set(row.content_key, [...(map.get(row.content_key) ?? []), row])
    }
    return map
  }, [rows, deviceFilter])

  const reactions = useMemo(() => ({ getBadges: (key) => byKey.get(key) ?? [] }), [byKey])

  // Если выбран фильтр — показываем только блоки с реакциями этого устройства
  const onlyReacted = deviceFilter !== ALL

  return (
    <ProgressContext value={progress}>
      <ReactionsContext value={reactions}>
        <main className="app admin">
          <div className="admin__bar">
            <label>
              Устройство:{' '}
              <select value={deviceFilter} onChange={(event) => setDeviceFilter(event.target.value)}>
                <option value={ALL}>Все ({devices.length})</option>
                {devices.map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            {error && <span className="admin__error">{error}</span>}
            {!rows && !error && <span>Загрузка…</span>}
          </div>

          {story.pages.map((page) => {
            const blocks = page.blocks.filter(
              (block) => !onlyReacted || byKey.has(contentKey(story.id, block.id)),
            )
            if (blocks.length === 0) return null

            return (
              <div className="admin__page" key={page.id}>
                <PageCard title={page.title}>
                  {blocks.map((block) => (
                    <BlockRenderer key={block.id} block={block} />
                  ))}
                </PageCard>
              </div>
            )
          })}
        </main>
      </ReactionsContext>
    </ProgressContext>
  )
}

export default AdminApp
