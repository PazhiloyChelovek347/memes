import { useRef } from 'react'

import { SWIPE_MIN_DISTANCE } from '../config/constants.js'

/**
 * Горизонтальный свайп. Возвращает обработчики для onTouchStart / onTouchEnd.
 * Вертикальная прокрутка не считается свайпом.
 */
export function useSwipe({ onSwipeLeft, onSwipeRight }) {
  const start = useRef(null)

  const onTouchStart = (event) => {
    const touch = event.touches[0]
    start.current = { x: touch.clientX, y: touch.clientY }
  }

  const onTouchEnd = (event) => {
    if (!start.current) {
      return
    }

    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.current.x
    const dy = touch.clientY - start.current.y
    start.current = null

    if (Math.abs(dx) < SWIPE_MIN_DISTANCE || Math.abs(dx) < Math.abs(dy)) {
      return
    }

    if (dx < 0) onSwipeLeft()
    else onSwipeRight()
  }

  return { onTouchStart, onTouchEnd, onTouchCancel: () => (start.current = null) }
}
