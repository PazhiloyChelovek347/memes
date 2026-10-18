import { useEffect, useEffectEvent } from 'react'

/** Листание стрелками ← → на клавиатуре */
export function useArrowKeys({ onLeft, onRight }) {
  const handleKey = useEffectEvent((event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return
    if (event.target.closest?.('input, textarea, select, [contenteditable="true"]')) return

    if (event.key === 'ArrowLeft') onLeft()
    if (event.key === 'ArrowRight') onRight()
  })

  useEffect(() => {
    window.addEventListener('keydown', handleKey)

    return () => window.removeEventListener('keydown', handleKey)
  }, [])
}
