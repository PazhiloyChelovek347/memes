import { useProgress } from '../../hooks/progressContext.js'
import { matchesCondition, pickMessage } from '../../lib/conditions.js'
import Button from '../ui/Button.jsx'
import Message from '../ui/Message.jsx'

/**
 * Кнопка-реакция: после нажатия показывает message.
 * disabledWhen — условие, при котором кнопка видна, но не нажимается.
 * messageVariants — другой текст ответа в зависимости от условий (первый подошедший).
 * @param {{ block: import('../../types/story.js').ButtonBlock }} props
 */
function ButtonBlock({ block }) {
  const { isActive, activate } = useProgress()
  const clicked = isActive(block.id)
  const disabled = !!block.disabledWhen && matchesCondition(block.disabledWhen, isActive)
  const message = pickMessage(block, isActive)

  return (
    <div className="stack">
      <Button variant={block.variant} done={clicked} disabled={disabled} onClick={() => activate(block.id)}>
        {block.label}
      </Button>
      {clicked && <Message>{message}</Message>}
    </div>
  )
}

export default ButtonBlock
