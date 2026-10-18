/**
 * Проверяет условие visibleWhen.
 * @param {import('../types/story.js').Condition | undefined} condition
 * @param {(id: string) => boolean} isActive
 */
export function matchesCondition(condition, isActive) {
  if (!condition) {
    return true
  }

  const { clicked, all, oneFrom, not } = condition

  if (clicked && !isActive(clicked)) return false
  if (all && !all.every(isActive)) return false
  if (oneFrom && !oneFrom.some(isActive)) return false
  if (not && matchesCondition(not, isActive)) return false

  return true
}

/** Все id, на которые ссылается условие (для проверки опечаток) */
export function conditionIds(condition) {
  if (!condition) {
    return []
  }

  const { clicked, all = [], oneFrom = [], not } = condition

  return [...(clicked ? [clicked] : []), ...all, ...oneFrom, ...conditionIds(not)]
}

/** Текст ответа кнопки: первый подошедший из messageVariants, иначе обычный message */
export function pickMessage(block, isActive) {
  const variant = block.messageVariants?.find((item) => matchesCondition(item.when, isActive))

  return variant ? variant.message : block.message
}
