import { useProgress } from '../../hooks/progressContext.js'
import { contentKey } from '../../lib/story.js'
import { blockRegistry } from '../blocks/registry.js'

/**
 * Рендерит любой блок по его type. Обёртка с data-content-id —
 * будущая точка для лайков (двойной тап по элементу).
 */
function BlockRenderer({ block }) {
  const { isVisible, storyId } = useProgress()
  const Component = blockRegistry[block.type]

  if (!Component || !isVisible(block.visibleWhen)) {
    return null
  }

  return (
    <div className="block" data-content-id={contentKey(storyId, block.id)}>
      <Component block={block} />
    </div>
  )
}

export default BlockRenderer
