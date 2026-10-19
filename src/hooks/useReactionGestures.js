import { useRef } from "react";

import {
  DOUBLE_TAP_MS,
  LONG_PRESS_MS,
  TAP_MOVE_TOLERANCE,
} from "../config/constants.js";

// По этим элементам жесты не ловим: у них свои клики и управление
const IGNORED = 'button, a, input, select, textarea, video, [role="button"]';

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

/**
 * Жесты реакций на блоке: двойной тап/клик → onLike, удержание LONG_PRESS_MS → onDislike.
 * Возвращает обработчики pointer-событий для элемента блока.
 */
export function useReactionGestures({ onLike, onDislike }) {
  const timer = useRef(null);
  const origin = useRef(null);
  const lastTap = useRef(null);

  const cancel = () => {
    clearTimeout(timer.current);
    timer.current = null;
    origin.current = null;
  };

  return {
    onPointerDown: (event) => {
      if (event.button > 0 || event.target.closest(IGNORED)) return;

      origin.current = { x: event.clientX, y: event.clientY };
      timer.current = setTimeout(() => {
        cancel();
        lastTap.current = null;
        onDislike();
      }, LONG_PRESS_MS);
    },

    onPointerMove: (event) => {
      if (
        origin.current &&
        distance(origin.current, { x: event.clientX, y: event.clientY }) >
          TAP_MOVE_TOLERANCE
      ) {
        cancel();
      }
    },

    onPointerUp: (event) => {
      if (!origin.current) return;

      const point = { x: event.clientX, y: event.clientY, time: Date.now() };
      cancel();

      const previous = lastTap.current;
      if (
        previous &&
        point.time - previous.time < DOUBLE_TAP_MS &&
        distance(previous, point) < TAP_MOVE_TOLERANCE * 3
      ) {
        lastTap.current = null;
        onLike();
      } else {
        lastTap.current = point;
      }
    },

    onPointerCancel: cancel,
  };
}
