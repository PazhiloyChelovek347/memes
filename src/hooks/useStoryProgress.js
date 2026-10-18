import { matchesCondition } from '../lib/conditions.js'
import { isPageUnlocked } from '../lib/story.js'
import { usePersistentState } from './usePersistentState.js'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

/**
 * Всё состояние прохождения рассказа: текущая страница, активированные блоки,
 * ответы на вопросы, счётчики tap-блоков. Сохраняется отдельно для каждого рассказа.
 * @param {import('../types/story.js').Story} story
 */
export function useStoryProgress(story) {
  const ns = `story:${story.id}`
  const [savedPage, setSavedPage] = usePersistentState(`${ns}:page`, 0)
  const [activated, setActivated] = usePersistentState(`${ns}:activated`, [])
  const [answers, setAnswers] = usePersistentState(`${ns}:answers`, {})
  const [taps, setTaps] = usePersistentState(`${ns}:taps`, {})

  const lastIndex = story.pages.length - 1
  // Страниц могло стать меньше с прошлого визита — не даём индексу выйти за границы
  const pageIndex = clamp(Number(savedPage) || 0, 0, lastIndex)
  const page = story.pages[pageIndex]

  const isActive = (id) => activated.includes(id)

  const activate = (id) => {
    setActivated((current) => (current.includes(id) ? current : [...current, id]))
  }

  const canGoNext = pageIndex < lastIndex && isPageUnlocked(page, isActive)
  const canGoPrevious = pageIndex > 0

  return {
    storyId: story.id,
    page,
    pageIndex,
    pageCount: story.pages.length,
    canGoNext,
    canGoPrevious,
    goNext: () => canGoNext && setSavedPage(pageIndex + 1),
    goPrevious: () => canGoPrevious && setSavedPage(pageIndex - 1),

    isActive,
    activate,
    isVisible: (condition) => matchesCondition(condition, isActive),

    getAnswer: (blockId) => answers[blockId],
    setAnswer: (blockId, optionIndex) => {
      setAnswers((current) => ({ ...current, [blockId]: optionIndex }))
      activate(blockId)
    },

    getTaps: (blockId) => taps[blockId] ?? 0,
    addTap: (blockId, target) => {
      const next = Math.min((taps[blockId] ?? 0) + 1, target)

      setTaps((current) => ({ ...current, [blockId]: next }))

      if (next >= target) {
        activate(blockId)
      }
    },
  }
}
