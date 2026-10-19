import { useProgress } from "../../hooks/progressContext.js";
import {
  BlockKeyContext,
  useReactionsContext,
} from "../../hooks/reactionsContext.js";
import { useReactionGestures } from "../../hooks/useReactionGestures.js";
import { contentKey } from "../../lib/story.js";
import { blockRegistry } from "../blocks/registry.js";
import ReactionMark from "./ReactionMark.jsx";

// У этих блоков значок рисуется внутри самого медиа-кадра (см. ImageBlock / VideoBlock)
const MEDIA_TYPES = ["image", "video"];

/**
 * Рендерит любой блок по его type. Обёртка с data-content-id — ключ, по которому
 * хранятся реакции. Двойной тап — ❤️, удержание — 😡 (см. useReactionGestures).
 */
function BlockRenderer({ block }) {
  const { isVisible, storyId } = useProgress();
  const reactions = useReactionsContext();
  const Component = blockRegistry[block.type];
  const key = contentKey(storyId, block.id);

  const gestures = useReactionGestures({
    onLike: () => reactions?.toggle?.(key, "like"),
    onDislike: () => reactions?.toggle?.(key, "dislike"),
  });

  if (!Component || !isVisible(block.visibleWhen)) {
    return null;
  }

  return (
    <BlockKeyContext value={key}>
      <div
        className="block"
        data-content-id={key}
        {...(reactions?.toggle ? gestures : {})}
      >
        <Component block={block} />
        {!MEDIA_TYPES.includes(block.type) && <ReactionMark />}
      </div>
    </BlockKeyContext>
  );
}

export default BlockRenderer;
