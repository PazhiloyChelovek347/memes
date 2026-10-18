import { conditionIds } from './conditions.js'

/** Ключ элемента контента — по нему будут храниться лайки/реакции */
export function contentKey(storyId, blockId) {
  return `${storyId}:${blockId}`
}

/** Страница закрыта, пока не активирован хотя бы один её блок с allowNext */
export function isPageUnlocked(page, isActive) {
  const gates = page.blocks.filter((block) => block.allowNext)

  return gates.length === 0 || gates.some((block) => isActive(block.id))
}

/**
 * В режиме разработки подсказывает об ошибках в data-файлах:
 * нет id, повторяющиеся id, условие ссылается на несуществующий id.
 */
export function validateStory(story, knownTypes) {
  if (!import.meta.env.DEV) {
    return
  }

  const warn = (message) => console.warn(`[story "${story.id}"] ${message}`)
  const seen = new Set()
  const pageIds = new Set()

  for (const page of story.pages) {
    if (!page.id || pageIds.has(page.id)) warn(`страница без id или с повторяющимся id: "${page.id}"`)
    pageIds.add(page.id)

    for (const block of page.blocks) {
      if (!block.id) warn(`блок без id на странице "${page.id}"`)
      else if (seen.has(block.id)) warn(`повторяющийся id блока "${block.id}"`)
      seen.add(block.id)

      if (!knownTypes.includes(block.type)) warn(`неизвестный тип блока "${block.type}" (id "${block.id}")`)
    }
  }

  for (const page of story.pages) {
    for (const block of page.blocks) {
      const conditions = [
        block.visibleWhen,
        block.disabledWhen,
        ...(block.messageVariants ?? []).map((variant) => variant.when),
      ]

      for (const id of conditions.flatMap(conditionIds)) {
        if (!seen.has(id)) warn(`блок "${block.id}" ссылается на несуществующий id "${id}"`)
      }
    }
  }
}
