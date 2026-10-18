import { createContext, useContext } from 'react'

/** Прогресс рассказа, доступный любому блоку без пробрасывания props */
export const ProgressContext = createContext(null)

/** @returns {ReturnType<typeof import('./useStoryProgress.js').useStoryProgress>} */
export function useProgress() {
  const progress = useContext(ProgressContext)

  if (!progress) {
    throw new Error('useProgress must be used inside <ProgressContext>')
  }

  return progress
}
